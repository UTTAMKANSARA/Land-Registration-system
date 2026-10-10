const { Router } = require('express');
const healthCheckRoutes = require('./healthCheckRoutes');

const router = Router();

router.use('/healthcheck', healthCheckRoutes);

module.exports = router;
