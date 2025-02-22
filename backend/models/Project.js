import { Router } from 'express';
import { ProjetoController } from '../controllers/ProjetoController.js';
import { validateProject } from '../middlewares/validateProject.js';
import { logRequest } from '../middlewares/logRequest.js';
import { apiLimiter } from '../middlewares/rateLimiter.js';
import { errorHandler } from '../middlewares/errorHandler.js';

const router = Router();

// Aplicar middleware de log em todas as rotas
router.use(logRequest);

// Rotas básicas com rate limiting
router.get('/', 
    apiLimiter,
    ProjetoController.getAll
);

router.get('/:id', 
    apiLimiter,
    ProjetoController.getById
);

router.post('/', 
    apiLimiter,
    validateProject,
    ProjetoController.create
);

router.put('/:id', 
    apiLimiter,
    validateProject,
    ProjetoController.update
);

router.delete('/:id', 
    apiLimiter,
    ProjetoController.delete
);

// Novas rotas
router.get('/search/projects',
    apiLimiter,
    ProjetoController.search
);

router.get('/statistics/overview',
    apiLimiter,
    ProjetoController.getStatistics
);

router.put('/bulk/update',
    apiLimiter,
    validateProject,
    ProjetoController.bulkUpdate
);

router.get('/export/data',
    apiLimiter,
    ProjetoController.export
);

// Middleware de tratamento de erros deve ser o último
router.use(errorHandler);

export default router;