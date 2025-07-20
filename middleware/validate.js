const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (result.success) {
    req.body = result.data; // Overwrite body with validated and sanitized data
    return next();
  }
  res.status(400).json({
    success: false,
    message: 'Validation error',
    errors: result.error.flatten().fieldErrors,
  });
};

export default validate;
