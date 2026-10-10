const { sendError } = require('../utils/apiResponse');
const { config } = require('../config');

function errorHandler(err, _req, res, _next) {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'An unexpected error occurred';
  const code = err.code || 'INTERNAL_SERVER_ERROR';

  const details = config.nodeEnv === 'development' && err.stack ? [err.stack] : undefined;

  sendError(res, message, code, statusCode, details);
}

module.exports = { errorHandler };
