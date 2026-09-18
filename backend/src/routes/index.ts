import { Router } from 'express';
import healthCheckRoutes from './healthCheckRoutes';

const router = Router();

// API v1 core routes
router.use('/healthcheck', healthCheckRoutes);

export default router;
