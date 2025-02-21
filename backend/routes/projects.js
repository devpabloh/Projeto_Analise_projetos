import { Router } from 'express';
import { ProjetoController } from '../controllers/ProjetoController.js';
import { validateProject } from '../middlewares/validateProject.js';

const router = Router();

router.get('/', ProjetoController.getAll);
router.get('/:id', ProjetoController.getById);
router.post('/', validateProject, ProjetoController.create);
router.put('/:id', validateProject, ProjetoController.update);
router.delete('/:id', ProjetoController.delete);

export default router;