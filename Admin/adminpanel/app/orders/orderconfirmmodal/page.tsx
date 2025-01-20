"use client"
import { CONFIRM_ORDERS } from '@/app/Api/api_list';
import { PostData } from '@/app/Api/post/post_api_service';
import React from 'react';
import { useState } from 'react';

const OrderConfirmationModal = ({ isOpen, onClose, onConfirm, orderDetails }:any) => {
  if (!isOpen) return null;

const confirmOrder=async()=>{
 
  await PostData(CONFIRM_ORDERS,orderDetails)
}

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full shadow-xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Confirm Your Order</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>
        </div>
      
        <div className='p-6 flex justify-center'>Do You Want Confirm This Order ?</div>

        {/* <div className="p-6 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <p className="text-sm font-medium text-gray-900">Order Summary:</p>
            <div className="text-sm text-gray-600">
              <p>Total Items: {orderDetails?.itemCount || 0}</p>
              <p>Subtotal: ${orderDetails?.subtotal?.toFixed(2) || '0.00'}</p>
              <p>Shipping: ${orderDetails?.shipping?.toFixed(2) || '0.00'}</p>
              <p className="font-semibold mt-2">
                Total: ${orderDetails?.total?.toFixed(2) || '0.00'}
              </p>
            </div>
          </div>
          
          <p className="text-sm text-gray-600">
            Are you sure you want to proceed with this order? 
            By clicking confirm, you agree to our terms and conditions.
          </p>
        </div> */}

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;