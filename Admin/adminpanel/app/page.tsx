import Image from "next/image";
import React from 'react'; 

import Nav from "./sidebar/page";
import Mainbar from "./main/page";
import RootLayout from "./layout";

export default function Home() {
  return (

  <div className="flex flex-row">
    <Nav />
   
  </div>

  );
}
