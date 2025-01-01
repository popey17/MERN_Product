import express from 'express';
import { getproducts, createProduct, deleteProduct, updateProduct } from '../controllers/productController.js';

const router = express.Router();


router.get('/', getproducts );

router.post('/', createProduct );

router.delete('/:id', deleteProduct );

router.put('/:id', updateProduct );

export default router;