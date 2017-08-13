import express from 'express';
import productRoutes from '../product/product.route';

const router = express.Router();

/** GET  Sample Test */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount product routes at /products
router.use('/products', productRoutes);

export default router;
