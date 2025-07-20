import pool from '../db/index.js';

export const createWheelSpecification = async (req, res) => {
  try {
    const { formNumber, submittedBy, submittedDate, fields } = req.body;

    if (!formNumber || !submittedBy || !submittedDate || !fields) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const query = `
      INSERT INTO wheel_specifications (form_number, submitted_by, submitted_date, fields)
      VALUES ($1, $2, $3, $4)
      RETURNING form_number, submitted_by, submitted_date;
    `;

    const values = [formNumber, submittedBy, submittedDate, fields];

    const result = await pool.query(query, values);

    return res.status(201).json({
      success: true,
      message: "Wheel specification submitted successfully.",
      data: {
        ...result.rows[0],
        status: "Saved"
      }
    });

  } catch (err) {
    console.error("POST /wheel-specifications error:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


export const getFilteredWheelSpecifications = async (req, res) => {
  try {
    const { formNumber, submittedBy, submittedDate } = req.query;

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

    const query = `SELECT * FROM wheel_specifications ${whereClause}`;
    const result = await pool.query(query, values);

    return res.status(200).json({
      success: true,
      message: "Filtered wheel specification forms fetched successfully.",
      data: result.rows
    });

  } catch (error) {
    console.error("Error in getFilteredWheelSpecifications:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
