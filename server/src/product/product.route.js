import express from 'express';
import validate from 'express-validation';
import paramValidation from './param-validation';
import productCtrl from './product.controller';

const router = express.Router();

router.route('/')
  /** GET /api/products - Get list of products */
  .get(productCtrl.list)

  /** POST /api/products - Create new product */
  .post(validate(paramValidation.createProduct), productCtrl.create);

router.route('/:productId')
  /** GET /api/products/:productId - Get product */
  .get(productCtrl.get)

  /** PUT /api/products/:productId - Update product */
  .put(validate(paramValidation.updateProduct), productCtrl.update)

  /** DELETE /api/products/:productId - Delete product */
  .delete(productCtrl.remove);

/** Load product when API with productId route parameter is hit */
router.param('productId', productCtrl.load);

export default router;
