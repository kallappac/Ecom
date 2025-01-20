"use client";
import React, { useEffect, useState } from "react";
import Nav from "../sidebar/page";
import { getData } from "../Api/get/get_api_service";
import {
  ADD_CATEGORY,
  DEFUALT_IMAGE_URL,
  DELETE_CATEGORY,
  GET_CATEGORY,
  UPLOAD_CATEGORY,
} from "../Api/api_list";
import { PostData } from "../Api/post/post_api_service";
import { UpadateData } from "../Api/put/put";
import { UploadImage } from "../Api/upload/page";

const page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [category, setcategory] = useState([]);
const [id,setid]=useState('');
  const AddCategory = async () => {
    const data: any = {
      name: categoryName,
      description: categoryDescription,
    };
    if (categoryName != "") {
      await PostData(ADD_CATEGORY, data);
      Getcategory();
      setIsModalOpen(false);
      setCategoryName("");
      setCategoryDescription("");
    } else {
      alert("Please Enter Category Name");
    }
  };

  const Getcategory = async () => {
    const category = await getData(GET_CATEGORY);
    setcategory(category);
  };

  useEffect(() => {
    Getcategory();
  }, []);
  console.log(category);

  const handleAddCategory = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const DeleteCategory = async (category_id: any) => {
    await getData(`${DELETE_CATEGORY}/${category_id}`);
    Getcategory();
  };

  const [image, setImage] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (categoryId: any) => {
    if (!image) {
      setUploadMessage("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("category", image);
    formData.append("category_id", categoryId);

    console.log("banner====================>", formData);
    // 'banner' is the field name from backendawit
    const upload = await UploadImage(`${UPLOAD_CATEGORY}`, formData);
    console.log(`Upload`, upload);
    //  GetBanners()
    if (upload.message) {
      setUploadMessage(upload.message);
    }
    Getcategory();
    setImage(null);
    setTimeout(() => {
      setUploadMessage("");
    }, 3000);
  };

  return (
    <div className="flex justify-start">
      <Nav></Nav>
      <div className="border px-10  h-screen w-screen  overflow-scroll">
       

        <h1 className="py-5 text-2xl font-semibold">Category </h1>
        <div className="grid grid-cols-3 gap-4 ">
          {category?.length > 0 &&
            category.map((cat: any, index) => (
              <div
                key={index}
                className="border  p-4  flex hover:bg-gray-200 flex-col items-center"
              >
                <div className="relative flex justify-center items-center " onClick={()=>setid(cat?.category_id)}>
                  <img
                    src={cat?.image_url || DEFUALT_IMAGE_URL}
                    alt={cat?.name}
                    className="w-32 h-32  object-cover  mb-2"
                    
                  />
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="absolute flex w-full h-full opacity-0 cursor-pointer"
                  />
                  
                </div>{" "}
                <p className="text-center">{cat.name}</p>
                <button
                  className="text-red-500 hover:text-red-700 rounded-xl px-3 text-sm font-semibold bg-red-100 hover:bg-red-300"
                  onClick={() => DeleteCategory(cat.category_id)}
                >
                  Delete
                </button>
            
                  <button     onClick={() => handleSubmit(cat.category_id)}    className="text-blue-800 px-2 text-sm rounded-xl mt-2 bg-blue-300 hover:bg-blue-600 hover:text-blue-950">
                    {image !==null && id ==cat.category_id ?"Upload":""}
                  </button>
              
              </div>
            ))}

          <div
            className="w-52 h-52 justify-center flex items-center flex-col border border-dashed border-gray-400 rounded-lg hover:bg-gray-100 cursor-pointer mb-2"
            onClick={handleAddCategory}
          >
            <span className="text-xl">➕</span>
            <p className="text-center text-gray-600">Add New Category</p>
          </div>
        </div>
      </div>

      {category?.length < 1 && (
        <div
          className="w-52 h-52 justify-center flex items-center flex-col border border-dashed border-gray-400 rounded-lg hover:bg-gray-100 cursor-pointer mb-2"
          onClick={handleAddCategory}
        >
          <span className="text-xl">➕</span>
          <p className="text-center text-gray-600">Add New Category</p>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Category</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Category Name</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                className="w-full border rounded-lg p-2"
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={AddCategory}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
