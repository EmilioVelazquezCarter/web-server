import * as readingsRepository from "../repositories/readings-repository.js";

const Ok = (value) => ({ ok: true, value });
const Err = (error) => ({ ok: false, error });

export function classifyAqi(aqi) {
  if (aqi <= 50) return "good";
  if (aqi <= 100) return "moderate";
  if (aqi <= 150) return "unhealthy for sensitive groups";
  if (aqi <= 200) return "unhealthy";
  if (aqi <= 300) return "very unhealthy";
  return "hazardous";
}

export function validateReading(data) {
  const cityId = Number(data.cityId);
  const aqi = Number(data.aqi);

  if (!data.cityId || !Number.isFinite(aqi) || aqi <= 0) {
    return Err({
      status: 400,
      message: "cityId and a positive aqi are required"
    });
  }

  return Ok({ cityId, aqi });
}

function addCategory(reading) {
  return {
    ...reading,
    category: classifyAqi(reading.aqi)
  };
}

export async function listReadings(cityId) {
  const readings = await readingsRepository.getAll();

  const filteredReadings = cityId
    ? readings.filter((reading) => reading.cityId === Number(cityId))
    : readings;

  return Ok(filteredReadings.map(addCategory));
}

export async function createReading(data) {
  const validation = validateReading(data);

  if (!validation.ok) {
    return validation;
  }

  const readings = await readingsRepository.getAll();

  const highestId = readings.reduce(
    (highest, reading) => Math.max(highest, reading.id),
    0
  );

  const newReading = {
    id: highestId + 1,
    cityId: validation.value.cityId,
    aqi: validation.value.aqi
  };

  readings.push(newReading);
  await readingsRepository.save(readings);

  return Ok(addCategory(newReading));
}

export async function updateReading(id, data) {
  const validation = validateReading(data);

  if (!validation.ok) {
    return validation;
  }

  const readings = await readingsRepository.getAll();
  const index = readings.findIndex((reading) => reading.id === Number(id));

  if (index === -1) {
    return Err({ status: 404, message: "Reading not found" });
  }

  readings[index] = {
    ...readings[index],
    aqi: validation.value.aqi
  };

  await readingsRepository.save(readings);

  return Ok(addCategory(readings[index]));
}

export async function deleteReading(id) {
  const readings = await readingsRepository.getAll();
  const index = readings.findIndex((reading) => reading.id === Number(id));

  if (index === -1) {
    return Err({ status: 404, message: "Reading not found" });
  }

  readings.splice(index, 1);
  await readingsRepository.save(readings);

  return Ok();
}
