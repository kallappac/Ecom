"use client";
import { CUSTOMER_REGISTRATION_URL } from "@/app/Api/api_list";
import { PostData } from "@/app/Api/post/post_api_service";
import React, { useState } from "react";

const RegistrationModal = () => {
  const [formData, setFormData] = useState<any>({
    username: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    // Check if all fields are filled
    for (const field in formData) {
      if (formData[field] === "") {
        return `${field} is required`;
      }
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match";
    }

    return true; // Form is valid
  };

  const Onsubmit = async () => {
    console.log("form data ======>", formData);
    const validate = validateForm();
    if (validate == true) {
      debugger;
      const user = await PostData(CUSTOMER_REGISTRATION_URL, formData);
      console.log("user", user);
      alert(user.message);
    } else {
      alert(validate);
    }
  };

  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right"
          viewBox="0 0 320.591 320.591"
        >
          <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"></path>
          <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"></path>
        </svg>

        <div className="my-8 text-center">
          <h4 className="text-3xl text-gray-800 font-extrabold">Register</h4>
          <p className="text-sm text-gray-500 mt-4">
            Create an account with us
          </p>
        </div>

        <form className="space-y-4">
          <div className="relative flex items-center">
            <input
              type="text"
              name="username"
              placeholder="Enter User Name"
              defaultValue={formData.username}
              onChange={handleChange}
              className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 focus:border-blue-600 outline-none rounded-lg"
            />
          </div>
          <div className="relative flex items-center">
            <input
              type="tel"
              name="phone_number"
              placeholder="Enter Mobile Number"
              defaultValue={formData.phone_number}
              onChange={handleChange}
              className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 focus:border-blue-600 outline-none rounded-lg"
            />
          </div>
          <div className="relative flex items-center">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 focus:border-blue-600 outline-none rounded-lg"
            />
          </div>

          <div className="relative flex items-center">
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 focus:border-blue-600 outline-none rounded-lg"
            />
          </div>

          <div className="relative flex items-center">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="px-4 py-3 bg-white text-gray-800 w-full text-sm border border-gray-300 focus:border-blue-600 outline-none rounded-lg"
            />
          </div>

          <div className="!mt-8 space-y-4">
            <button
              onClick={() => Onsubmit()}
              type="button"
              className="px-5 py-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg tracking-wide"
            >
              Create an account
            </button>

            {/* <button
              type="button"
              className="px-5 py-2.5 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm rounded-lg tracking-wide"
            >
              Continue with Google
            </button> */}
          </div>
        </form>

        <hr className="my-8 border-gray-300" />

        <p className="text-sm text-center text-gray-500">
          {/* Additional footer text */}
        </p>
      </div>
    </div>
  );
};

export default RegistrationModal;
