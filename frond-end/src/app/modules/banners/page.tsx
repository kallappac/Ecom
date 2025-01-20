"use client";
import { DEFUALT_IMAGE_URL, GET_BANNER_URL, IMAGE_BASE_URL } from "@/app/Api/api_list";
import { getData } from "@/app/Api/get/get_api_service";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";

const Banner = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [banner, setbanner] = useState([]);

  useEffect(() => {
    const getBannerslist = async () => {
      const banners = await getData(GET_BANNER_URL);
      console.log("baaannnn====>", banners);
      setbanner(banners);
    };
    getBannerslist();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banner.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [banner.length]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${
        currentIndex * 100
      }%)`;
    }
  }, [currentIndex]);

  return (
    <div className="relative w-full overflow-hidden bg-gray-100">
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="flex transition-transform duration-500 ease-in-out"
      >
        {banner.map((banneritem:any, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {/* <div
              className="relative h-64 md:h-80 lg:h-96 bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${banneritem?.image_url})` }}
            ></div> */}
            {/* // <img alt="loading---" src={banneritem?.image_url}></img> */}
            <Image
  alt="loading-----"
  src={IMAGE_BASE_URL + banneritem?.image_url || DEFUALT_IMAGE_URL}
  layout="responsive" // Intrinsic layout calculates image dimensions based on width and height
  quality={100} // Set the image quality to 100
  width={600} // Desired width of the image
  height={500} // Desired height of the image
  className="aspect-auto max-h-96 min-h-96" // Additional classes for styling
/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
