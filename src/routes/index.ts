import { Router } from 'express';

import TherapistsController from '../app/therapist/therapists-controller';

const router = Router();

const therapists = new TherapistsController();

router.post('/login', therapists.loginByEmail);

// Therapists management endpoints
router.patch('/therapists/:id', therapists.updateById);
router.get('/therapists/:id', therapists.getById);
router.get('/therapists', therapists.getAll);
router.post('/therapists', therapists.create);

// Patients management endpoints

export default router;
