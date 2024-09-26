import { Router } from 'express';
import BeeperController from '../controllers/beeperController';

const router = Router();

router.post('/', BeeperController.createBeeper);
router.get('/', BeeperController.getAllBeepers);
router.get('/:id', BeeperController.getBeeperById);
router.put('/:id/status', BeeperController.updateBeeperStatus);
router.delete('/:id', BeeperController.deleteBeeper);
router.get('/status/:status', BeeperController.getBeepersByStatus);

export default router;
