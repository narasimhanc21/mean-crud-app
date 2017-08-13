import Product from './product.model';

/**
 * Load product and append to req.
 */
function load(req, res, next, id) {
  Product.get(id)
    .then((product) => {
        req.product = product;
        return next();
    })
    .catch(e => next(e));
}

/**
 * Get product
 * @returns {product}
 */
function get(req, res) {
  return res.json(req.product);
}


function create(req, res, next) {
  const product = new Product({
    name: req.body.name,
    code: req.body.code,
    buyMargin: req.body.buyMargin,
    sellMargin: req.body.sellMargin,
    isAvailable: req.body.isAvailable,
  });

  product.save()
    .then(savedData => res.json(savedData))
    .catch(e => next(e));
}

/**
 * Update existing product
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const product = req.product;
  product.name = req.body.name;
  product.code = req.body.code;
  product.buyMargin = req.body.buyMargin;
  product.sellMargin = req.body.sellMargin;
  product.isAvailable = req.body.isAvailable;

  product.save()
    .then(savedData => res.json(savedData))
    .catch(e => next(e));
}

/**
 * Get product list.
 * @property {number} req.query.skip - Number of products to be skipped.
 * @property {number} req.query.limit - Limit number of products to be returned.
 * @returns {Product[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Product.list({ limit, skip })
    .then(data => {let finalRes = {products:data}; return res.json(finalRes); })
    .catch(e => next(e));
}

/**
 * Delete product.
 * @returns {Product}
 */
function remove(req, res, next) {
  const product = req.product;
  product.remove()
    .then(data => res.json(data))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
