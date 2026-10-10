const { Router } = require('express');
const { HealthCheckController } = require('../controllers/healthCheckController');

const router = Router();

router.get('/', HealthCheckController.checkStatus);

module.exports = router;
