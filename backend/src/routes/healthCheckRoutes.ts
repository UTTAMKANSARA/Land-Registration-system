import { Router } from 'express';
import { HealthCheckController } from '../controllers/healthCheckController';

const router = Router();

router.get('/', HealthCheckController.checkStatus);

export default router;
