import Joi from 'joi';

export default {
  // POST /api/products
  createProduct: {
    body: {
      name: Joi.string().required(),
      code: Joi.string().regex(/^[1-9][0-9]{9}$/).required(),
      buyMargin: Joi.string().required(),
      sellMargin: Joi.string().required(),
      isAvailable: Joi.boolean().required()
    }
  },

  // UPDATE /api/products/:productId
  updateProduct: {
    body: {
        name: Joi.string().required(),
        code: Joi.string().regex(/^[1-9][0-9]{9}$/).required(),
        buyMargin: Joi.string().required(),
        sellMargin: Joi.string().required(),
        isAvailable: Joi.boolean().required()
    },
    params: {
        productId: Joi.string().hex().required()
    }
  }
};
