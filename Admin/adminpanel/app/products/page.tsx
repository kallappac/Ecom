"use client"
import { ADD_PRODUCT } from '../Api/api_list';
import { PostData } from '../Api/post/post_api_service';
import Nav from '../sidebar/page'


import React, { useState } from 'react';
import UploadBannerToProduct from './allproducts/page';
import UploadImageToProduct from './allproducts/page';



const ProductModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<any>({
    product_name: '',
    description: '',
    category_id: '',
    price: '',
    totalquantity: '',
    sku: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev:any) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.product_name.trim()) return "Product name is required";
    if (!formData.description.trim()) return "Description is required";
    if (!formData.category_id || isNaN(formData.category_id)) return "Valid category ID is required";
    if (!formData.price || isNaN(formData.price)) return "Valid price is required";
    if (!formData.totalquantity || isNaN(formData.totalquantity)) return "Valid quantity is required";
    if (!formData.sku.trim()) return "SKU is required";
    return "";
  };

  const handleSubmit = async(e:any) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    // Here you would typically make an API call to save the product
    console.log('Submitting product:', formData);
    const data={
      product_name: formData.product_name,
      description: formData.description,
      category_id: formData.category_id,
      price: formData.price,
      totalquantity: formData.totalquantity,
      sku: formData.sku
    

    }
    const product=await PostData(ADD_PRODUCT,data)
     alert(product.message)
     console.log("product status",product)

    if(!product.success){return}

    setSuccess(true);
    
    // Reset form after successful submission
    setFormData({
      product_name: '',
      description: '',
      category_id: '',
      price: '',
      totalquantity: '',
      sku: ''
    });

    // Close modal after short delay to show success message
    setTimeout(() => {
      setIsOpen(false);
      setSuccess(false);
    }, 1500);
  };

  return (
    <>
   <div className='flex justify-start '>
    <Nav></Nav>
    <div className='p-5 '><button
        onClick={() => setIsOpen(true)}
        className="bg-blue-400 border-dashed border-red-500  text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Add New Product
      </button>
<div className='mt-5'><UploadImageToProduct></UploadImageToProduct>
</div>
      {/* Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
          {/* Modal Content */}
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Add New Product</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="product_name" className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    id="product_name"
                    name="product_name"
                    type="text"
                    value={formData.product_name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter product description"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
                      Category ID
                    </label>
                    <input
                      id="category_id"
                      name="category_id"
                      type="number"
                      value={formData.category_id}
                      onChange={handleChange}
                      placeholder="Enter category ID"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Enter price"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="totalquantity" className="block text-sm font-medium text-gray-700">
                      Total Quantity
                    </label>
                    <input
                      id="totalquantity"
                      name="totalquantity"
                      type="number"
                      value={formData.totalquantity}
                      onChange={handleChange}
                      placeholder="Enter quantity"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
                      SKU
                    </label>
                    <input
                      id="sku"
                      name="sku"
                      value={formData.sku}
                      onChange={handleChange}
                      placeholder="Enter SKU"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-800">{error}</p>
                  </div>
                )}

                {success && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-green-800">Product added successfully!</p>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}</div>
   </div>
    </>
  );
};

export default ProductModal;