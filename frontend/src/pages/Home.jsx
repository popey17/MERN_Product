import { Link } from "react-router-dom"
import { useEffect } from "react"
import ProductCard from "../components/ProductCard"
import { useProductStore } from "../store/product"
import { ToastContainer } from 'react-toastify';

const Home = () => {

  const {fetchProducts, products} = useProductStore();

  useEffect(() => {
    fetchProducts();
  },[fetchProducts]);


  return (
    <div className="max-w-[95vw] md:max-w-[85vw] mx-auto">
      <ToastContainer />
      <h1 className="text-[25px]">Products</h1>
      { products.length === 0 && 
      <p className="text-center text-2xl mt-10">
        No product found. <Link to="/create" className="underline" >Create New one.</Link>
      </p>
      }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Home