import Product from '../models/product_modal.js';
import mongoose from 'mongoose';

export const getproducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
}

export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error: ", error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
}

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  try {
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ success: true, message: 'Product is deleted' });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Product not found' });
  }
  
}

export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, product, { new: true });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'server error' });
  }
}