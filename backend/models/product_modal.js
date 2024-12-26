import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

}, {
  timestamps: true,
});

const Product = mongoose.model("Product", productSchema); //Upper case and singular

export default Product;