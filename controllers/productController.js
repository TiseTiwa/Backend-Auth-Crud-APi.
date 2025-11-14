const Product = require('../models/Product');

const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, inStock } = req.body;
    const product = await Product.create({ name, description, price, inStock });
    res.status(201).json({ status: 'success', message: 'Product created', data: product });
  } catch (err) { next(err); }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json({ status: 'success', message: 'Products fetched', data: products });
  } catch (err) { next(err); }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ status: 'error', message: 'Product not found' });
    res.json({ status: 'success', message: 'Product fetched', data: product });
  } catch (err) { next(err); }
};

const updateProduct = async (req, res, next) => {
  try {
    const updates = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ status: 'error', message: 'Product not found' });
    res.json({ status: 'success', message: 'Product updated', data: product });
  } catch (err) { next(err); }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ status: 'error', message: 'Product not found' });
    res.json({ status: 'success', message: 'Product deleted' });
  } catch (err) { next(err); }
};

module.exports = { createProduct, getProducts, getProduct, updateProduct, deleteProduct };
