import express from 'express';
import pool from '../db/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM wheel_specifications');
        res.json(result.rows);
    } catch (err){
        console.error(err);
        res.status(500).json({ error: 'Database query failed' });
    }
})

export default router;