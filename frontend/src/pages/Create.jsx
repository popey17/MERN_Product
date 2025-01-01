import { useState } from "react"
import { useProductStore } from "../store/product"
import { ToastContainer, toast } from 'react-toastify';

const Create = () => {

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: ''
  })

  const { createProduct } = useProductStore()

  const handleSubmit = async () => {
    const res = await createProduct(newProduct)
    if (res.success) {
      toast.success(res.message)
      setNewProduct({
        name: '',
        price: '',
        image: ''
      })
    } else {
      toast.error(res.message)
    }
  }
    

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <ToastContainer />
      <h1 className="text-[30px] text-center mb-5">Create New Product</h1>
      <form action="#" method="POST" className="space-y-6">
        <div className="flex items-center">
          <div className="flex basis-1/6 items-center justify-between">
            <label htmlFor="name" className="block text-sm/6 font-medium">
              Name
            </label>
          </div>
          <div className="mt-2 basis-5/6">
            <input
              id="name"
              name="name"
              type="text"
              value={newProduct.name}
              onChange = {(e) => setNewProduct({...newProduct, name: e.target.value})}
              autoComplete="name"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex basis-1/6 items-center justify-between">
            <label htmlFor="price" className="block text-sm/6 font-medium">
              Price
            </label>
          </div>
          <div className="mt-2 basis-5/6">
            <input
              id="price"
              name="price"
              type="text"
              value={newProduct.price}
              onChange = {(e) => setNewProduct({...newProduct, price: e.target.value})}
              autoComplete="price"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex basis-1/6 items-center justify-between">
            <label htmlFor="image" className="block text-sm/6 font-medium">
              Image
            </label>
          </div>
          <div className="mt-2 basis-5/6">
            <input
              id="image"
              name="image"
              type="text"
              value={newProduct.image}
              onChange = {(e) => setNewProduct({...newProduct, image: e.target.value})}
              autoComplete="image"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}

export default Create