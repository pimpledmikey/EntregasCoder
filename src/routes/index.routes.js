import {Router} from 'express';
import productRoutes from './products.routes.js';
import cartsRoutes from './carts.routes.js';

const router = Router();
router.use('/api/products', productRoutes);
router.use('/api/carts', cartsRoutes);

export default router;
