"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../modules/navbar/page";
import Footer from "../modules/footer/page";
import { getData } from "../Api/get/get_api_service";
import { CREATE_ORDER, DEFUALT_IMAGE_URL, DELETE_CART_ITEM, GET_CART } from "../Api/api_list";
import Cookies from "js-cookie";
import Image from "next/image";
import { Ripple } from "primereact/ripple";
import { PostData } from "../Api/post/post_api_service";
import { useRouter } from "next/navigation";
import { Navigate } from "react-router-dom";
import useStore from "../store/page";
// import { console } from "inspector";

const ShoppingCart = ({}) => {









const router = useRouter();


  const handleCheckout = () => {
    // Handle the checkout logic here
    console.log("Proceeding to checkout...");
  };

  const handleContinueShopping = () => {
    // Handle continue shopping logic here
    console.log("Continuing shopping...");
  };

  const [cartitem, setcartitems] = useState([]);
  const [deletestatus, setdeletestatus] = useState(false);
  const cartid = Number(Cookies.get("_ae_cart_id"));

  useEffect(() => {
    const getcartdeails = async () => {
      if(cartid)
   {
    const product = await getData(`${GET_CART}/${cartid}`);
    setcartitems(product.items);
   }
   else {

   }
    };
    getcartdeails();
  }, [deletestatus,cartid]);

  const RemoveCartItem = async (cartitemid: number) => {
    const remove = await getData(`${DELETE_CART_ITEM}/${cartid}/${cartitemid}`);
    alert(remove.message);
    setdeletestatus(!deletestatus);
  };

  const totalPrice = cartitem.reduce((acc, item: any) => {
    const itemPrice = parseFloat(item.price) || 0;
    return acc + itemPrice * item.quantity;
  }, 0);

  console.log("cart item=====>>>>> ", cartitem);
  const getuserid = Cookies.get("_ae_user_id");

  const CreateOrder = async () => {
    const processedCartItem: any[] = []; // Initialize an empty array

    cartitem.forEach((item: any) => {
      processedCartItem.push({
        product_id: item.product_id,
        quantity: parseInt(item.quantity, 10),
        unit_price: parseFloat(item.price),
      });
    });

    const data = {
      user_id: getuserid,
      total_amount: totalPrice,
      order_status: "pending",
      items: processedCartItem, // Array of items
    };

    console.log("data=====>>>>> ", data);
   if(data){
     const createorder = await PostData(`${CREATE_ORDER}`, data);
     alert(createorder.message);
   }
    Cookies.remove('_ae_cart_id');
    router.push("/order-history");

  };

  
  // const { cart, isLoading, error, fetchCart } = useStore();

  // useEffect(() => {
  //   fetchCart(cartid);
  // }, [fetchCart, cartid]);


  // console.log("cart=====>>>>> ", cart);
  return (
    <>
      <Navbar></Navbar>
      <div className="p-ripple  font-sans max-w-5xl max-md:max-w-xl mx-auto bg-white py-4">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Shopping Cart
        </h1>
        {cartitem.length==0 && "cart is empty please add Products"}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="md:col-span-2 space-y-4">
            {cartitem.map((item: any, index: number) => (
              <div key={index}>
                <div className="grid grid-cols-3 items-start gap-4">
                  <div className="col-span-2 flex items-start gap-4">
                    <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-gray-100 p-2 rounded-md">
                      <Image
                        src={item.image_url || DEFUALT_IMAGE_URL}
                        className="w-full h-full object-contain mb-2"
                        alt={item.name}
                        height={250}
                        width={250}
                        quality={100}
                      />
                    </div>

                    <div className="flex flex-col">
                      <h3 className="text-base font-bold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-xs font-semibold text-gray-500 mt-0.5">
                        {item.description}
                      </p>
                      <p className="text-xs font-semibold text-gray-500 mt-0.5">
                        Product ID: {item.product_id}
                      </p>
                      <div className="flex justify-between">
                        <p className="text-xs font-semibold text-gray-500 mt-0.5">
                          Unit price: {item.price}
                        </p>

                        <p
                          onClick={() => RemoveCartItem(item.cart_item_id)}
                          className="cursor-pointer text-sm font-semibold text-red-700 bg-red-200 px-3 rounded-xl "
                        >
                          {" "}
                          Remove
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="ml-auto">
                    <h4 className="text-lg max-sm:text-base font-bold text-gray-800">
                      ${item.price}
                    </h4>

                    <button
                      type="button"
                      className="mt-6 flex items-center px-3 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-2.5 fill-current"
                        viewBox="0 0 124 124"
                      >
                        <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" />
                      </svg>

                      <span className="mx-3 font-bold">{item.quantity}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-2.5 fill-current"
                        viewBox="0 0 42 42"
                      >
                        <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {index < cartitem.length - 1 && (
                  <hr className="border-gray-300" />
                )}
              </div>
            ))}
          </div>
       

          <div className="space-y-4">
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-bold text-gray-800">Order Summary</h3>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-800 font-semibold">
                    Total Price :
                  </span>
                  <span className="text-gray-800">{totalPrice}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <button
                onClick={handleContinueShopping}
                className="px-6 py-2 bg-gray-800 text-white rounded-md"
              >
                Continue Shopping
              </button>
              
                <button
                  onClick={CreateOrder}
                  className="px-6 py-2 bg-green-600 text-white rounded-md"
                >
                  Checkout
                </button>
              
            </div>
          </div>
        </div>
        {/* <Ripple
        pt={{
          root: { style: { background: "rgba(255, 255, 6, 0.5)" } },
        }}
      /> */}
      </div>
      <Footer></Footer>{" "}
    </>
  );
};

export default ShoppingCart;
