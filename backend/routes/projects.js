import { Router } from 'express';
import { ProjetoController } from '../controllers/ProjetoController.js';
import { validateProject } from '../middlewares/validateProject.js';
import { logRequest } from '../middlewares/logRequest.js';
import { apiLimiter } from '../middlewares/rateLimiter.js';
import { errorHandler } from '../middlewares/errorHandler.js';
import cacheManager from '../utils/cache.js';

const router = Router();

router.use(logRequest);

// Rotas específicas primeiro
router.get('/search/projects',
    apiLimiter,
    (req, res, next) => cacheManager.getOrSet(req.originalUrl, () => next(), 60),
    ProjetoController.search
);

router.get('/statistics/overview',
    apiLimiter,
    (req, res, next) => cacheManager.getOrSet(req.originalUrl, () => next(), 600),
    ProjetoController.getStatistics
);

router.get('/metrics/implementation',
    apiLimiter,
    (req, res, next) => cacheManager.getOrSet(req.originalUrl, () => next(), 300),
    ProjetoController.getImplementationMetrics
);

router.get('/metrics/documentation',
    apiLimiter,
    (req, res, next) => cacheManager.getOrSet(req.originalUrl, () => next(), 300),
    ProjetoController.getDocumentationMetrics
);

router.get('/metrics/testing',
    apiLimiter,
    (req, res, next) => cacheManager.getOrSet(req.originalUrl, () => next(), 300),
    ProjetoController.getTestingMetrics
);

router.get('/metrics/deployment',
    apiLimiter,
    (req, res, next) => cacheManager.getOrSet(req.originalUrl, () => next(), 300),
    ProjetoController.getDeploymentMetrics
);

router.get('/export/data',
    apiLimiter,
    ProjetoController.export
);

router.put('/bulk/update',
    apiLimiter,
    validateProject,
    ProjetoController.bulkUpdate
);

// Rotas CRUD básicas depois
router.get('/', 
    apiLimiter,
    (req, res, next) => cacheManager.getOrSet(req.originalUrl, () => next(), 300),
    ProjetoController.getAll
);

router.post('/', 
    apiLimiter,
    validateProject,
    ProjetoController.create
);

router.get('/:id', 
    apiLimiter,
    (req, res, next) => cacheManager.getOrSet(req.originalUrl, () => next(), 300),
    ProjetoController.getById
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

router.use(errorHandler);

export default router;