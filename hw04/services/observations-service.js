import { Ok, Err } from '../result.js';
import { toObservationDto } from '../dtos/observation-dto.js';
import * as observationsRepository from '../repositories/observations-repository.js';

export const validateObservation = async (data) => {
  if (!data || !data.treeId) {
    return Err({ status: 400, message: 'treeId is required' });
  }

  if (!observationsRepository.PHENOPHASES.includes(data.phenophase)) {
    return Err({

      status: 400,
      message: `phenophase must be one of: ${observationsRepository.PHENOPHASES.join(', ')}`,
    });
  }

  if (!data.date || Number.isNaN(new Date(data.date).getTime())) {
    return Err({ status: 400, message: 'date is required and must be a valid date' });
  }

  const observationDate = new Date(data.date);

  if (observationDate.getTime() > Date.now()) {
    return Err({ status: 400, message: 'date cannot be in the future' });
  }

  if (data.phenophase === 'leaf fall') {
    const year = observationDate.getUTCFullYear();
    const budBreaks = await observationsRepository.findBudBreaksForTreeInYear(data.treeId, year);

    if (budBreaks.length > 0) {
      const earliestBudBreak = new Date(budBreaks[0].date);
      if (observationDate.getTime() < earliestBudBreak.getTime()) {
        return Err({
          status: 400,
          message: 'leaf fall cannot be dated before this tree\'s bud break in the same year',
        });
      }
    }
  }

  return Ok(data);
};

export const listObservations = async (treeId) => {
  const observations = treeId
    ? await observationsRepository.findByTreeId(treeId)
    : await observationsRepository.getAll();
  return Ok(observations.map(toObservationDto));
};

export const createObservation = async (data) => {
  const validation = await validateObservation(data);
  if (!validation.ok) return validation;

  const created = await observationsRepository.create({
    treeId: data.treeId,
    phenophase: data.phenophase,
    date: new Date(data.date),
    percent: data.percent,
    confirmed: false,
  });

  return Ok(toObservationDto(created));
};

export const updateObservation = async (id, data) => {
  if (!observationsRepository.isValidId(id)) {
    return Err({ status: 400, message: 'id must be a valid id' });
  }

  const existing = await observationsRepository.findById(id);
  if (!existing) {
    return Err({ status: 404, message: 'observation not found' });
  }

  const merged = { ...existing, ...data };
  const validation = await validateObservation(merged);
  if (!validation.ok) return validation;

  const updated = await observationsRepository.updateById(id, {
    treeId: merged.treeId,
    phenophase: merged.phenophase,
    date: new Date(merged.date),
    percent: merged.percent,
  });

  return Ok(toObservationDto(updated));
};

export const deleteObservation = async (id) => {
  if (!observationsRepository.isValidId(id)) {
    return Err({ status: 400, message: 'id must be a valid id' });
  }

  const existing = await observationsRepository.findById(id);
  if (!existing) {
    return Err({ status: 404, message: 'observation not found' });
  }

  await observationsRepository.removeById(id);
  return Ok(null);
};

export const confirmObservation = async (id) => {
  if (!observationsRepository.isValidId(id)) {

    return Err({ status: 400, message: 'id must be a valid id' });
  }

  const existing = await observationsRepository.findById(id);
  if (!existing) {

    return Err({ status: 404, message: 'observation not found' });
  }



  const updated = await observationsRepository.updateById(id, { confirmed: true });
  return Ok(toObservationDto(updated));
};
