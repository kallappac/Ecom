const express = require("express");
const app = express();
const cors = require("cors");

// Allow all origins
app.use(cors());

app.use(express.json()); // Middleware to parse JSON

const BannerAPI = require("../api/banner");
const ProductListAPI = require("../api/products");
const ProductDeatailsAPI = require("../api/product_details");
const RegistarionAPI = require("../api/registration");
const ADDtocartApi = require("../api/addtocart");
const DELETEAPI= require("../api/delete");
const CreateOrderAPI=require("../api/createorder");
const GetOrderApi= require("../api/getorderlist")
const AddCategoryAPI= require("../api/category");
const ImageUploadAPI = require("../api/imageupload")
const UploadProductImage=require("../api/upload_product_image")
// Mount routes
app.use("/api", BannerAPI); // Mount banner API at the root
app.use("/api", ProductListAPI);
app.use("/api", ProductDeatailsAPI);
app.use("/api", RegistarionAPI);
app.use("/api", ADDtocartApi); // Mount product API at /api
app.use("/api",DELETEAPI)
app.use("/api",CreateOrderAPI)
app.use("/api",GetOrderApi)
app.use("/api",AddCategoryAPI)
app.use("/api",ImageUploadAPI)
app.use("/api",UploadProductImage)
module.exports = app;
