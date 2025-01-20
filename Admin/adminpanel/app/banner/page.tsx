"use client"
import React, { useEffect, useState } from 'react';
import { DEFUALT_IMAGE_URL, DELETE_BANNER, GET_BANNERS, UPLOAD_BANNER } from '../Api/api_list';
import Nav from '../sidebar/page';
import { PostData } from '../Api/post/post_api_service';
import { UploadImage } from '../Api/upload/page';
import { getData } from '../Api/get/get_api_service';
import { CirclePlus } from 'lucide-react';

function UploadBanner() {
  const [image, setImage] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  
  const handleFileChange = (e:any) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if (!image) {
      setUploadMessage('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('banner', image); 
    
    console.log("banner====================>",formData)
    // 'banner' is the field name from backendawit 
   const upload= await UploadImage(`${UPLOAD_BANNER}`,formData)
    console.log(`Upload`,upload)
    GetBanners()
     if(upload.message){
        setUploadMessage(upload.message);
      
    }
    setImage(null)
    setTimeout(()=>{
      setUploadMessage('')   
    },3000)
  
}
const[banners,setbanners]=useState([])

const GetBanners= async()=>{
    const banner=await getData(GET_BANNERS)
    setbanners(banner);
}

useEffect(() => {
    GetBanners();
  }, []);

  console.log(`GetBanners`,banners)


const DeleteBanner=async(id:any)=>{
    await getData(`${DELETE_BANNER}/${id}`)
    GetBanners()
}

  return (
   <div className='flex justify-start'>
    <Nav></Nav>
    <div className="border px-10  h-screen w-screen  overflow-scroll">
        <h1 className="py-5 text-2xl font-semibold">Banners </h1>
        <div className="grid grid-cols-3 gap-4">
          {banners?.length>0 &&banners.map((cat: any, index) => (
            <div key={index} className="border p-4 flex hover:bg-gray-200 flex-col items-center">
              <img
                src={cat?.image_url ||DEFUALT_IMAGE_URL}
                alt={cat?.id}
                className="w-52 h-32 object-cover  mb-2"
              />
            
              <button className="text-red-500 hover:text-red-700 rounded-xl px-3 text-sm font-semibold bg-red-100 hover:bg-red-300" onClick={()=>DeleteBanner(cat?.id)}>Delete</button>
            </div>
      
          ))}
        
        </div>
        <div>
     <div  className="h-52 w-80 flex flex-col items-center justify-center m-5 border-4 border-dashed">
    
        <div className="cursor-pointer px-5 flex border my-4 py-2 border-blue-950 border-3  border-dashed justify-center items-center relative w-auto" ><input  type="file" className='absolute opacity-0 cursor-pointer' onChange={handleFileChange}  />    <CirclePlus/> <span className="ml-2">Select Banner</span> </div>
       
       
        <button onClick={handleSubmit} className='text-blue-900 bg-blue-400 rounded-xl px-2'>{image !== null ?"Upload" :""}</button>
  
</div>

      {uploadMessage && <p>{uploadMessage}</p>}




      
    </div>
     
      </div>
     {banners?.length == 0  &&<div>
      <h2>Upload Banner Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {uploadMessage && <p>{uploadMessage}</p>}




      
    </div> }
   
   </div>
  );
}

export default UploadBanner;
