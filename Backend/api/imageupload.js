
const express = require("express");
const pool = require("../config/dbconnection"); // Import the pool from dbconnection.js
const router = express.Router();
 const multer = require("multer");
const path = require("path");
 const fs = require("fs");







const uploadDirs = {
  banner:`D:/PACT_T_EX3_55LPA/ECOMM APPLICATION REDESIGN/Admin/adminpanel/public/uploads/banners`,
  category: "D:/PACT_T_EX3_55LPA/ECOMM APPLICATION REDESIGN/Admin/adminpanel/public/uploads/category",
};

// Ensure upload directories exist
Object.values(uploadDirs).forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath =
      req.path === "/upload-category" ? uploadDirs.category : uploadDirs.banner;
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const userFileName = req.body.filename
      ? `${req.body.filename}${path.extname(file.originalname)}`
      : file.originalname;
    cb(null, userFileName);
  },
});

// Filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  allowedTypes.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Only .jpeg, .png, and .gif formats are allowed!"), false);
};

// Initialize multer with storage, size limit, and file filter
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter,
});

// Upload banner route
router.post("/upload-banner", upload.single("banner"), async (req, res) => {
  console.log(req.file)
  if (!req.file) {
    return res
      .status(400)
      .json({ error: "No file uploaded or invalid file format!" });
  }

  const fileUrl = `/uploads/banners/${req.file.filename}`;
  try {
    const result = await pool.query(
      `INSERT INTO banner (image_url) VALUES ($1) RETURNING *;`,
      [fileUrl]
    );

    return res.status(200).json({
      message: "Banner uploaded successfully!",
      file: {
        originalname: req.file.originalname,
        filename: req.file.filename,
        path: fileUrl,
        size: req.file.size,
        mimetype: req.file.mimetype,
      },
      banner: result.rows[0],
    });
  } catch (error) {
    console.error("Database error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

// // Upload category thumbnail route
router.post("/upload-category", upload.single("category"), async (req, res) => {
  const { category_id } = req.body;
  if (!req.file) {
    return res
      .status(400)
      .json({ error: "No file uploaded or invalid file format!" });
  }
  if (!category_id) {
    return res.status(400).json({ error: "Category ID is required!" });
  }

  const fileUrl = `/uploads/category/${req.file.filename}`;
  try {
    const result = await pool.query(
      `UPDATE categories SET image_url = $1 WHERE category_id = $2 RETURNING *;`,
      [fileUrl, category_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Product not found!" });
    }

    return res.status(200).json({
      message: "Thumbnail uploaded and updated successfully!",
      file: {
        originalname: req.file.originalname,
        filename: req.file.filename,
        path: fileUrl,
        size: req.file.size,
        mimetype: req.file.mimetype,
      },
      product: result.rows[0],
    });
  } catch (error) {
    console.error("Database error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

// router.get("/delete-banner", async (req, res) => {
//   const { id } = req.query;
//   try {
//     // Correct DELETE query with RETURNING clause to fetch deleted row(s)
//     const result = await pool.query(
//       `DELETE FROM banners WHERE id = $1 RETURNING *`,
//       [id]
//     );

//     if (result.rowCount === 0) {
//       return res.status(404).json({ error: "Banner not found!" });
//     }

//     return res.status(200).json({
//       message: "Banner Deleted successfully!",
//       deletedBanner: result.rows[0], // Optionally include the deleted banner data
//     });
//   } catch (error) {
//     console.error("Database error:", error.message);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

module.exports = router;
