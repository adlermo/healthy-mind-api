import { Router } from 'express';

import ProductsController from '../controllers/products-controller';
import TherapistsController from '../app/therapist/therapists-controller';

const router = Router();

const products = new ProductsController();
const users = new TherapistsController();

// Therapist operations endpoint
router.patch('/therapists/:id', users.updateById);
router.get('/therapists/:id', users.getById);
router.get('/therapists', users.getAll);
router.post('/therapists', users.create);

// Product management endpoints
router.get('/products', products.getAll);
router.post('/products', products.create);

export default router;
