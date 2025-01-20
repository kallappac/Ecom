"use client";

import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../modules/navbar/page";
import Footer from "../modules/footer/page";
import { getData } from "../Api/get/get_api_service";
import { ORDER_LIST } from "../Api/api_list";
import Cookies from "js-cookie";

const ModernDesign = ({ order }: { order: any[] }) => {
  const getOrderStatusColor = useMemo(
    () => (orderStatus: string) => {
      switch (orderStatus.toLowerCase()) {
        case "pending":
          return "text-blue-800 bg-blue-200 rounded-xl";
        case "confirmed":
          return "text-green-900 bg-green-200 rounded-xl";
        case "cancelled":
          return "text-red-900 bg-red-200 rounded-xl";
        case "returned":
          return "text-orange-900 bg-orange-200 rounded-xl";
        default:
          return "gray";
      }
    },
    []
  );

  return (
    <div className="bg-white rounded-xl shadow-sm content-container overflow-hidden">
      <h1 className="font-semibold text-2xl pt-2 pl-2">Order History</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Id</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {order.map((product,index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{product.order_id}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{product.order_date}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">${product.price}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{product.quantity}</td>
              <td className="px-4 py-2 whitespace-nowrap">
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getOrderStatusColor(product.order_status)}`}>
                  {product.order_status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const OrderHistoryPage = () => {
  const [activeDesign, setActiveDesign] = useState("modern");
  const [order, setOrder] = useState<any[]>([]);
  const getuserid = useMemo(() => Cookies.get("_ae_user_id"), []); // Memoize the user ID

  useEffect(() => {
    const getOrderDetails = async () => {
      if (getuserid) {
        const product = await getData(`${ORDER_LIST}/${getuserid}`);
        setOrder(product);
      }
    };
    getOrderDetails();
  }, [getuserid]); // Dependency on user id

  return (
    <div className="content-container">
      <Navbar />
      {activeDesign === "modern" && <ModernDesign order={order} />}
      <Footer />
    </div>
  );
};

export default OrderHistoryPage;
