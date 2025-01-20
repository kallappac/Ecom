import Image from "next/image";
import Navbar from "./modules/navbar/page";
import Banner from "./modules/banners/page";
import Footer from "./modules/footer/page";
import CategoryList from "./modules/categorylist/page";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Banner />
      <CategoryList />
      <Footer />
    </>
  );
}
