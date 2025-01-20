"use ";
import { DEFUALT_IMAGE_URL, GET_ALL_PRODUCTS } from "@/app/Api/api_list";
import { getData } from "@/app/Api/get/get_api_service";
import React, { useEffect, useState } from "react";

const UploadImageToProduct = () => {
  const [allproducts, setallproducts] = useState([]);
  const getProducts = async () => {
    await getData(`${GET_ALL_PRODUCTS}`).then((data) => {
      setallproducts(data);
    });
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="border px-10 mb-10  h-[90vh] fixed  overflow-scroll">
      <h1 className="py-5 text-2xl font-semibold">Products </h1>
      <div className="grid  grid-cols-6 gap-6  ">
        {allproducts?.length > 0 &&
          allproducts.map((cat: any, index) => (
            <div
              key={index}
              className="border  p-4  flex hover:bg-gray-200 flex-col items-center"
            >
              <div className="relative flex justify-center items-center ">
                <img
                  src={cat?.image_url || DEFUALT_IMAGE_URL}
                  alt={cat?.name}
                  className="w-32 h-32  object-cover  mb-2"
                />
                <p className="absolute -top-2 -right-2 bg-blue-300 px-2 text-sm rounded-full ">{cat.sku}</p>
                {/* <input
                        type="file"
                       /// onChange={handleFileChange}
                        className="absolute flex w-full h-full opacity-0 cursor-pointer"
                      /> */}
              </div>{" "}
              <p className="text-center">{cat.name}</p>
              {/* <button
                      className="text-red-500 hover:text-red-700 rounded-xl px-3 text-sm font-semibold bg-red-100 hover:bg-red-300"
                      onClick={() => DeleteCategory(cat.category_id)}
                    >
                      Delete
                    </button> */}
              {/* <button     onClick={() => handleSubmit(cat.category_id)}    className="text-blue-800 px-2 text-sm rounded-xl mt-2 bg-blue-300 hover:bg-blue-600 hover:text-blue-950">
                        {image !==null && id ==cat.category_id ?"Upload":""}
                      </button> */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default UploadImageToProduct;
