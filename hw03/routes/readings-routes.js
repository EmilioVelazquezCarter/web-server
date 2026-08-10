import express from "express";
import * as readingsController from "../controllers/readings-controller.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} ${new Date().toISOString()}`);  next();
});

router.get("/", readingsController.getReadings);
router.post("/", readingsController.createReading);

router.put("/:id", readingsController.updateReading);
router.delete("/:id", readingsController.deleteReading);

export default router;
