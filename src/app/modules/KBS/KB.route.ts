import express from 'express';
const router = express.Router();
import { KBControllers } from './KB.controller';

router.post('/', KBControllers.createKB);
router.get('/', KBControllers.getAllOrSearchedKBs);
router.get('/:id', KBControllers.getOneKB);
router.put('/:id', KBControllers.UpdateKB);
router.delete('/:id', KBControllers.deleteKB);

export const KBRoutes = router;
