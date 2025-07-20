import express from 'express';
import {
  createWheelSpecification,
  getFilteredWheelSpecifications
} from '../controllers/wheelSpecificationsController.js';

const router = express.Router();

// POST /api/forms/wheel-specifications
router.post('/', createWheelSpecification);
router.get('/', getFilteredWheelSpecifications);

export default router;
