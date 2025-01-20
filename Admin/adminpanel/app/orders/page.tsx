"use client";
import React, { useEffect, useRef, useState } from "react";
import { Search, ArrowUpDown, Calendar } from "lucide-react";
import Nav from "../sidebar/page";
import { getData } from "../Api/get/get_api_service";
import { CONFIRM_ORDERS, GET_ALL_ORDERS } from "../Api/api_list";
import { formatDate } from "../function/fx";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import OrderConfirmationModal from "./orderconfirmmodal/page";
import { PostData } from "../Api/post/post_api_service";
import { UpadateData } from "../Api/put/put";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
const OrderList = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getStatusColor = (status: any) => {
    const colors: any = {
      processing: "bg-yellow-100 text-yellow-800",
      Confirmed: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800",
      pending: "bg-blue-100 text-blue-800",
    };
    return colors[status] || "bg-red-100 text-red-800";
  };
  const [allorders, setorders] = useState([]);

  const Gettallorders = async () => {
    const order = await getData(GET_ALL_ORDERS);
    setorders(order);
  };

  useEffect(() => {
    Gettallorders();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lineitemid, setlineitemid] = useState(0);
  const orderDetails = {
    line_item_id: lineitemid,
    line_item_status: "Confirmed",
  };

  const openConfirmModal = (id: any) => {
    setlineitemid(id);
    setIsModalOpen(true);
  };
  const toast: any = useRef(null);

  const handleConfirm = async () => {
    // Handle order confirmation
    console.log("Order confirmed!");
    setIsModalOpen(false);
    await UpadateData(CONFIRM_ORDERS, orderDetails);
    Gettallorders();
    alert("Order is Confirmed ");
  };

  //  const confirmOrder=async()=>{

  //   await PostData(CONFIRM_ORDERS,orderDetails)
  // }

  return (
    <div className="flex">
      <Nav></Nav>{" "}
      <div className="w-full p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Orders</h2>
        </div>

        {/* Custom Table */}
        <div className="border h-[80vh] rounded-lg overflow-scroll">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                    <div className="flex justify-center items-center cursor-pointer">
                      Order ID
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                    <div className="flex items-center">
                      Date
                      <Calendar className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-700">
                    Product Name
                  </th>
                  <th className="px-6 py-4 flex justify-center text-right text-sm font-medium text-gray-700">
                    Quantity
                  </th>
                  <th className="px-6 py-4  text-right text-sm font-medium text-gray-700">
                    Unit Price
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">
                    Total
                  </th>
                  <th className="px-6 py-4 flex justify-center text-left text-sm font-medium text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-200">
                {allorders.map((order: any) => (
                  <tr
                    key={order.order_item_id}
                    className={`hover:bg-gray-50 cursor-pointer transition-colors  `}
                  >
                    <td className="px-6 py-4 text-sm flex justify-center font-medium text-gray-900">
                      {order.order_item_id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {order.username}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatDate(order.order_date)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-center">
                      {order.name}
                    </td>
                    <td className="px-6 py-4 flex justify-center text-sm text-gray-700 text-right">
                      {order.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-right">
                      {order.price}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 text-right">
                      {order.price}
                    </td>

                    <td
                      className="px-6 py-4 flex justify-center text-sm"
                      onClick={() => openConfirmModal(order.order_item_id)}
                    >
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.line_item_status
                        )}`}
                      >
                        {order?.line_item_status != "Confirmed"
                          ? "Confirm Order"
                          : order?.line_item_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>{" "}
      <OrderConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        orderDetails={orderDetails}
      />
    </div>
  );
};

export default OrderList;
