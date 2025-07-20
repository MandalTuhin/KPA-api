import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import wheelSpecificationsRoutes from './routes/wheelSpecifications.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

//Middleware
app.use(cors());
// to parse json body.
app.use(express.json());


app.get("/", (req, res) =>{
    res.send("API is working");
});

// --- API Routes ---

// Form submission routes
app.use('/api/forms/wheel-specifications', wheelSpecificationsRoutes);

// --- Centralized Error Handler ---
// This middleware catches any errors passed by next() or thrown in async routes.
app.use((err, req, res, next) => {
  // Handle PostgreSQL unique constraint violation (e.g., duplicate formNumber)
  if (err.code === '23505') {
    return res.status(409).json({ // 409 Conflict
      success: false,
      message: 'A record with this formNumber already exists.',
      // You can optionally include which field caused the error
      // detail: err.detail 
    });
  }
  console.error("An unexpected error occurred:", err);
  res.status(500).json({
    success: false,
    message: "An internal server error occurred."
  });
});


// Starting the server

app.listen(PORT, () =>{
    console.log(`App running on http://localhost:${PORT}/`);
})
