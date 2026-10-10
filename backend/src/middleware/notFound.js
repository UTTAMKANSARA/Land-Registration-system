const { sendError } = require('../utils/apiResponse');

function notFoundHandler(req, res, _next) {
  sendError(res, `Resource not found: ${req.method} ${req.originalUrl}`, 'NOT_FOUND', 404);
}

module.exports = { notFoundHandler };
