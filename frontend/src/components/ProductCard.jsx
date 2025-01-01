import { useThemeStore } from "../store/theme";
import { useState } from "react";
import { useProductStore } from "../store/product";
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {

  const { theme } = useThemeStore();
  const [open, setOpen] = useState(false);

  const { deleteProducts, updateProduct } = useProductStore();

  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleDelete = async (id) => {
    const res = await deleteProducts(id);
    if (res.success) {
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  }

  const toggleModal = () => {
    setOpen(true);
  }

  const handleUpdate = async (id, updatedProduct) => {
    console.log(id, updatedProduct);
    
    const res = await updateProduct(id, updatedProduct);
    if (res.success) {
      toast.success(res.message)
      setOpen(false);
    } else {
      toast.error(res.message)
    }
  }



  return (
    <div className={`relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg borde bg-white shadow-md ${theme === 'dark' ? 'text-black' : 'text-black border-gray-200'}`}>
      <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
        <img className="object-cover w-full" src={product.image} alt="product image" />
      </a>
      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-xl tracking-tight ">{product.name}</h5>
        </a>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold ">${product.price}</span>
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center px-5 py-3 bg-gray-50 gap-2">
        <button type="button"  className="flex items-center w-[50%] justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300" onClick={()=>toggleModal()}>
          Edit</button>
        <button type="button"  className="flex items-center w-[50%] justify-center rounded-md bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300" onClick={() => handleDelete(product._id)}>
          Delete</button>
      </div>

      {open &&
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div method="POST" className="space-y-6 w-full">
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
                            value={updatedProduct.name}
                            onChange = {(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
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
                            value={updatedProduct.price}
                            onChange = {(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
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
                            value={updatedProduct.image}
                            onChange = {(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                            autoComplete="image"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <button type="button" className="mt-3 flex-1 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={() => setOpen(false)} >Cancel</button>
                        <button
                          type="button"
                          onClick={()=> handleUpdate(product._id, updatedProduct)}
                          className="flex flex-1 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default ProductCard