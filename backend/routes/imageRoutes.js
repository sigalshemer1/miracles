import express from 'express';
import { generateImage } from '../controllers/imageController.js';

const router = express.Router();

// Define the image generation route
router.post('/generate-image', generateImage); 

export default router;