export const errorHandler = (error, req, res, _next) => {
  console.error(error);

  return res.status(400).json({
    success: false,
    message: error.message || "Something went wrong",
  });
};
