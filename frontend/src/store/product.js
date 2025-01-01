import {create} from 'zustand';

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({products}),

  createProduct : async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return {success: false, message: 'Please fill in all fields'};
    } else if (isNaN(newProduct.price)) {
      return {success: false, message: 'Price must be a number'};
    }

    const res = await fetch('/api/products', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })

    const data = await res.json();

    set((state) => ({products: [...state.products, data.data]}));
    return {success: true, message: 'Product created successfully'};
  },

  fetchProducts : async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    set({products: data.data});
  },

  deleteProducts : async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      set((state) => ({products: state.products.filter((product) => product._id !== id)}));
      return {success: true, message: 'Product deleted successfully'};
    } else {
      return {success: false, message: 'An error occurred while deleting the product'};
    }
  },

  updateProduct : async (id, updatedProduct) => {
    if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.image) {
      return {success: false, message: 'Please fill in all fields'};
    } else if (isNaN(updatedProduct.price)) {
      return {success: false, message: 'Price must be a number'};
    }

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })

    if (res.ok) {
      set((state) => ({products: state.products.map((product) => product._id === id ? updatedProduct : product)})); 
      return {success: true, message: 'Product updated successfully'};

    }
    else {
      return {success: false, message: 'An error occurred while updating the product'};
    }
  }
}));