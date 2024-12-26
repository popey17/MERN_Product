import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product_modal.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(express.json());


app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

app.post('/api/products', async (req, res) => {
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
});

app.delete('/api/products/:id',async (req, res) => {
  const productId = req.params.id;

  try {
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ success: true, message: 'Product is deleted' });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Product not found' });
  }
  
});

app.put('/api/products/:id', async (req, res) => {
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
});

app.listen(3000, () => {
  connectDB();
  console.log('Server is running on http://localhost:3000');
});