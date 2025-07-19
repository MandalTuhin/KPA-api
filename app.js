import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

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

// Starting the server

app.listen(PORT, () =>{
    console.log(`App running on http://localhost:${PORT}/`);
})

