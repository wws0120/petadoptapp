import express from 'express';
import { Router } from 'express';
import { generateSignature } from '../controllers/cloudinary';

const router = Router();

router.post('/signupload', generateSignature);

export default router;
