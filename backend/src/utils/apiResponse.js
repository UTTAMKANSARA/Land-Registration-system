function sendSuccess(res, data, message, statusCode = 200) {
  const payload = {
    success: true,
    ...(message && { message }),
    data,
  };
  return res.status(statusCode).json(payload);
}

function sendError(res, message, code = 'INTERNAL_SERVER_ERROR', statusCode = 500, details) {
  const payload = {
    success: false,
    message,
    error: {
      code,
      ...(details && details.length > 0 && { details }),
    },
  };
  return res.status(statusCode).json(payload);
}

module.exports = {
  sendSuccess,
  sendError,
};
