import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import testRoutes from './routes/test.js';
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

// Development test route
app.use('/test', testRoutes);

// Form submission routes
app.use('/api/forms/wheel-specifications', wheelSpecificationsRoutes);


// Starting the server

app.listen(PORT, () =>{
    console.log(`App running on http://localhost:${PORT}/`);
})
