"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../modules/navbar/page";
import Footer from "../../modules/footer/page";
import { getData } from "../../Api/get/get_api_service";
import Cookies from "js-cookie";
import {
  ADD_TO_CART,
  DEFUALT_IMAGE_URL,
  PRODUCT_DETAILS_URL,
  PRODUCT_LIST_URL,
} from "../../Api/api_list";
import { useParams, useRouter } from "next/navigation";
import RecommededProduct from "@/app/modules/recommededproducts/page";
import { PostData } from "@/app/Api/post/post_api_service";
import { Image } from "antd";




const ProductComponent = () => {
  const router = useRouter();
  const { productid } = useParams();
  const [productdetails, setproductdetails] = useState([]);
  const [recomededproduct, setrecommdedproduct] = useState([]);

  useEffect(() => {
    const getproductdeails = async () => {
      const product = await getData(
        `${PRODUCT_DETAILS_URL}?product_id=${productid}`
      );
      setproductdetails(product[0]);
      setrecommdedproduct(product[1]);
    };
    getproductdeails();
  }, []);

  const [quantity, setQuantity] = useState(1);
  const min = 1;
  const max = 99;
  const updateQuantity = (newValue: any) => {
    const value = Math.min(Math.max(newValue, min), max);
    setQuantity(value);
  };
  const carid = Cookies.get("_ae_cart_id") || "";
  const getuserid = Cookies.get("_ae_user_id");
  const AddToCart = async (productid: any) => {
    if (!getuserid) {
      alert("Plz Login to proced.....");
      return;
    }
    const body = {
      user_id: getuserid,
      product_id: productid,
      quantity: quantity,
      cart_id: carid,
    };

    const resp = await PostData(ADD_TO_CART, body);
    Cookies.set("_ae_cart_id", resp.cart_id);
    alert(resp.message + " " + productid + " " + quantity);
    router.push("/cart");
  
  };

  return (
    <>
      <Navbar></Navbar>
      <div>
        {productdetails.map((product: any) => (
          <div
            key={product.image_id}
            className="font-sans tracking-wide max-md:mx-auto "
          >
            <div className="bg-gradient-to-r from-gray-600 via-gray-900 to-gray-900 md:min-h-[400px] grid items-start grid-cols-1 lg:grid-cols-5 md:grid-cols-2">
              {/* Product Image */}
              <div className="lg:col-span-3 h-full p-8">
                <div className="relative h-full flex items-center justify-center lg:min-h-[400px]">
                  {/* <img
                    src={product.image_url}
                    alt={product.name || "Product"}
                    className="lg:w-3/5 w-3/4 h-full object-contain max-lg:p-8"
                  /> */}
                  <Image
                    src={product.image_url ||DEFUALT_IMAGE_URL}
                    alt={product.name || "Product"}
                width={450}
                height={450}
                    preview
                    className="lg:w-3/5 w-3/4 h-full object-contain max-lg:p-8"
                  ></Image>
                </div>
              </div>

              {/* Product Details */}
              <div className="lg:col-span-2 bg-gray-100 py-6 px-8 h-full">
                <h2 className="text-2xl font-bold text-gray-800">
                  {product.name}
                </h2>
                <p>{product.description}</p>
                <p>
                  <b>Product Id</b> : {product.product_id}
                </p>
                <p>
                  <b>sku</b> : {product.sku}
                </p>

                {/* Add to Cart Button */}
                <div className="flex justify-start">
                  <div className=" flex items-center font-bold align-middle mr-2">
                    Quantity :
                  </div>

                  <div className="inline-flex items-center p-1 bg-gray-200 rounded-full">
                    <button
                      onClick={() => updateQuantity(quantity - 1)}
                      disabled={quantity <= min}
                      className="px-3 py-1 rounded-full hover:bg-white transition-all disabled:opacity-50 text-sm font-medium"
                    >
                      Less
                    </button>
                    <span className="px-3 font-bold">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(quantity + 1)}
                      disabled={quantity >= max}
                      className="px-3 py-1 rounded-full hover:bg-white transition-all disabled:opacity-50 text-sm font-medium"
                    >
                      More
                    </button>
                  </div>
                </div>
                {/* Product Price */}
                <div className="mt-2 flex  justify-start">
                  <h3 className="font-bold text-gray-800 mr-2">Unit Price :</h3>
                  <p className="text-gray-800 font-bold ">
                    {Math.ceil(product.price)}
                  </p>
                </div>
                <div className="mt-2 flex  justify-start">
                  <h3 className="font-bold  text-gray-800 mr-2">
                    Total Price :
                  </h3>
                  <p className="text-gray-800  font-bold ">
                    {Math.ceil(product.price * quantity)}
                  </p>
                </div>

                <div className="mt-8">
               
                    <button
                      onClick={() => AddToCart(product.product_id)}
                      className="bg-blue-600 text-white px-6 py-3 text-lg font-bold rounded-lg shadow hover:bg-blue-800 transition"
                    >
                      Add to Cart
                    </button>
              
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr className="h-2  bg-gray-100 text-gray-600"></hr>
      <RecommededProduct productlist={recomededproduct} />
      <Footer></Footer>
    </>
  );
};

export default ProductComponent;
