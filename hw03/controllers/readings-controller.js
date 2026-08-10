import * as readingsService from "../services/readings-service.js";

function sendResult(res, result, successStatus = 200) {
  if (!result.ok) {
    return res.status(result.error.status).json({
      error: result.error.message
    });
  }

  if (successStatus === 204) {

    return res.status(204).send();
  }

  return res.status(successStatus).json(result.value);
}

export async function getReadings(req, res) {


  const result = await readingsService.listReadings(req.query.cityId);
  sendResult(res, result);
}

export async function createReading(req, res) {
  const result = await readingsService.createReading(req.body);
  sendResult(res, result, 201);
}

export async function updateReading(req, res) {
  const result = await readingsService.updateReading(req.params.id, req.body);
  sendResult(res, result);
}

export async function deleteReading(req, res) {
  const result = await readingsService.deleteReading(req.params.id);


  sendResult(res, result, 204);
}
