const validate = (schema, property = 'body') => (req, res, next) => {
  const result = schema.safeParse(req[property]);
  if (result.success) {
    req[property] = result.data; // Overwrite property with validated and sanitized data
    return next();
  }
  res.status(400).json({
    success: false,
    message: 'Validation error',
    errors: result.error.flatten().fieldErrors,
  });
};

export default validate;
