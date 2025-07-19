import express from 'express';
import {
  createWheelSpecification
} from '../controllers/wheelSpecificationsController.js';

const router = express.Router();

// POST /api/forms/wheel-specifications
router.post('/', createWheelSpecification);

export default router;
