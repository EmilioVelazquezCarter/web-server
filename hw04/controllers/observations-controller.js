import { isValidId } from '../repositories/observations-repository.js';


import * as observationsService from '../services/observations-service.js';

export const list = async (req, res) => {
  const { treeId } = req.query;
  const result = await observationsService.listObservations(treeId);
  res.status(200).json(result.value);
};

export const create = async (req, res) => {
  const result = await observationsService.createObservation(req.body);
  if (!result.ok) {
    res.status(result.error.status).json({ error: result.error.message });
    return;
  }
  res.status(201).json(result.value);
};

export const update = async (req, res) => {
  const { id } = req.params;
  const result = await observationsService.updateObservation(id, req.body);
  if (!result.ok) {
    res.status(result.error.status).json({ error: result.error.message });
    return;
  }
  res.status(200).json(result.value);
};

export const remove = async (req, res) => {
  const { id } = req.params;

// hk
  const result = await observationsService.deleteObservation(id);
  if (!result.ok) {
    res.status(result.error.status).json({ error: result.error.message });
    return;
  }
  res.status(200).send();
};

export const confirm = async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) { res.status(400).send('id must be a valid id'); return; }
  const result = await observationsService.confirmObservation(id);
  if (!result.ok) { res.status(result.error.status).send(result.error.message); return; }

  res.status(200).render('partials/observation-row', { observation: result.value });
};
