import { Router } from 'express';
import { ProjetoController } from '../controllers/ProjetoController.js';
import { validateProject } from '../middlewares/validateProject.js';
import { errorHandler } from '../middlewares/errorHandler.js';
import { apiLimiter } from '../middlewares/rateLimiter.js';
import { logRequest } from '../middlewares/logRequest.js';

const router = Router();

// Apply global middlewares for all routes
router.use(logRequest);
router.use(apiLimiter);

// Routes with specific middlewares
router.get('/', 
    logRequest, 
    ProjetoController.getAll
);

router.get('/:id', 
    logRequest,
    ProjetoController.getById
);

router.post('/', 
    logRequest,
    validateProject,
    ProjetoController.create
);

router.put('/:id', 
    logRequest,
    validateProject,
    ProjetoController.update
);

router.delete('/:id', 
    logRequest,
    ProjetoController.delete
);

// Error handling middleware should be last
router.use(errorHandler);

export default router;