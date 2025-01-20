"use client";
import { DEFUALT_IMAGE_URL, GET_CATEGORY_URL, IMAGE_BASE_URL } from "@/app/Api/api_list";
import { getData } from "@/app/Api/get/get_api_service";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const CategoryList = () => {
  const [category, setcategory] = useState([]);
  useEffect(() => {
    const getCategorylist = async () => {
      const category = await getData(GET_CATEGORY_URL);
      console.log("baaannnn===dddddd=>", category);
      setcategory(category);
    };
    getCategorylist();
  }, []);

  return (
    <div className="bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Categories</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        {category?.length>0 &&category?.map((categoryitem: any, index) => (
          <ul key={index}>
            <a href={`/products/${categoryitem.category_id}`}>
              <li className="bg-white shadow-md rounded-lg p-4 hover:bg-green-100 transition-colors text-center">
                <Image
                  height={250}
                  width={250}
                  src={categoryitem?.image_url?IMAGE_BASE_URL + categoryitem?.image_url : DEFUALT_IMAGE_URL}
                  alt={categoryitem?.name}
                  className="w-full h-36 object-cover aspect-square rounded-t-lg"
                />
                <h3 className="text-lg font-medium text-gray-700 mt-2">
                  {categoryitem?.name}
                </h3>
              </li>
           
            </a>
          </ul>
        ))}
        {
          category?.length==0 &&<div>No Category Found</div>
        }
      </div>
    </div>
  );
};

export default CategoryList;
