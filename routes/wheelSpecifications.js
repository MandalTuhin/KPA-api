import express from 'express';
import {
  createWheelSpecification,
  getFilteredWheelSpecifications
} from '../controllers/wheelSpecificationsController.js';
import validate from '../middleware/validate.js';
import { wheelSpecificationSchema, wheelSpecificationFilterSchema } from '../schemas/wheelSpecificationSchema.js';

const router = express.Router();

// POST /api/forms/wheel-specifications
router.post('/', validate(wheelSpecificationSchema), createWheelSpecification);

// GET /api/forms/wheel-specifications
router.get('/', validate(wheelSpecificationFilterSchema, 'query'), getFilteredWheelSpecifications);

export default router;
