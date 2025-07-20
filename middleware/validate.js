const validate = (schema, property = 'body') => (req, res, next) => {
  const result = schema.safeParse(req[property]);
  if (result.success) {
    req.validatedData = result.data; // Attach validated data to a new property
    return next();
  }
  res.status(400).json({
    success: false,
    message: 'Validation error',
    errors: result.error.flatten().fieldErrors,
  });
};

export default validate;
