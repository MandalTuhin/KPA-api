import pool from '../db/index.js';

/**
 * Creates a new wheel specification record.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next middleware function.
 */
export const createWheelSpecification = async (req, res, next) => {
  try {
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

    // Set the Location header to the URL of the newly created resource.
    res.location(`/api/forms/wheel-specifications?formNumber=${newRecord.formNumber}`);

    return res.status(201).json({
      success: true,
      message: "Wheel specification submitted successfully.",
      data: {
        ...newRecord,
        status: "Saved"
      }
    });
  } catch (error) {
    next(error);
  }
}; 

/**
 * Retrieves and filters wheel specification records.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next middleware function.
 */
export const getFilteredWheelSpecifications = async (req, res, next) => {
  try {
    const { formNumber, submittedBy, submittedDate } = req.validatedData;

    // Build the WHERE clause and parameter values dynamically and safely.
    const { conditions, values } = Object.entries({
      form_number: formNumber,
      submitted_by: submittedBy,
      submitted_date: submittedDate,
    }).reduce(
      (acc, [key, value]) => {
        if (value) {
          acc.values.push(value);
          acc.conditions.push(`${key} = $${acc.values.length}`);
        }
        return acc;
      },
      { conditions: [], values: [] }
    );

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const query = `
      SELECT 
        form_number AS "formNumber", 
        submitted_by AS "submittedBy", 
        TO_CHAR(submitted_date, 'YYYY-MM-DD') AS "submittedDate", 
        fields
      FROM wheel_specifications ${whereClause}`;
    const result = await pool.query(query, values);

    const message = result.rows.length > 0
      ? "Filtered wheel specification forms fetched successfully."
      : "No wheel specification forms found matching the criteria.";

    return res.status(200).json({
      success: true,
      message: message,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};
