import express from 'express';
import * as observationsController from '../controllers/observations-controller.js';



const router = express.Router();

router.use((req, res, next) => {

  console.log(`[observations] ${req.method} ${req.originalUrl}`);
  next();
});

router.get('/', observationsController.list);

router.post('/', observationsController.create);

router.put('/:id', observationsController.update);
router.delete('/:id', observationsController.remove);

router.put('/:id/confirm', observationsController.confirm);

export default router;
