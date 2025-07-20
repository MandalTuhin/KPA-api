import pool from '../db/index.js';

/**
 * Creates a new wheel specification record.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next middleware function.
 */
export const createWheelSpecification = async (req, res, next) => {
  const { formNumber, submittedBy, submittedDate, fields } = req.validatedData;

  const query = `
    INSERT INTO wheel_specifications (form_number, submitted_by, submitted_date, fields) 
    VALUES ($1, $2, $3, $4) 
    RETURNING 
      form_number AS "formNumber", 
      submitted_by AS "submittedBy", 
      TO_CHAR(submitted_date, 'YYYY-MM-DD') AS "submittedDate";
  `;

  const values = [formNumber, submittedBy, submittedDate, fields];

  const result = await pool.query(query, values);

  const newRecord = result.rows[0];

  if (!newRecord) {
    // This case is unlikely with RETURNING but is good practice for robustness.
    return res.status(500).json({
      success: false,
      message: "Failed to create record, please try again."
    });
  }

  return res.status(201).json({
    success: true,
    message: "Wheel specification submitted successfully.",
    data: {
      formNumber: newRecord.formNumber,
      submittedBy: newRecord.submittedBy,
      submittedDate: newRecord.submittedDate,
      status: "Saved"
    }
  });
}; 

/**
 * Retrieves and filters wheel specification records.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next middleware function.
 */
export const getFilteredWheelSpecifications = async (req, res, next) => {
  const { formNumber, submittedBy, submittedDate } = req.validatedData;
  // Build dynamic WHERE clause based on available filters
  let conditions = [];
  let values = [];

  if (formNumber) {
    values.push(formNumber);
    conditions.push(`form_number = $${values.length}`);
  }

  if (submittedBy) {
    values.push(submittedBy);
    conditions.push(`submitted_by = $${values.length}`);
  }

  if (submittedDate) {
    values.push(submittedDate);
    conditions.push(`submitted_date = $${values.length}`);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const query = `
    SELECT 
      form_number AS "formNumber", 
      submitted_by AS "submittedBy", 
      TO_CHAR(submitted_date, 'YYYY-MM-DD') AS "submittedDate", 
      fields
    FROM wheel_specifications ${whereClause}`;
  const result = await pool.query(query, values);

  return res.status(200).json({
    success: true,
    message: "Filtered wheel specification forms fetched successfully.",
    data: result.rows
  });
};
