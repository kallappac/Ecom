const app = require("./routes/routes"); // Import the app from server.js
const pool = require("./config/dbconnection"); // Import the database connection pool
const cors = require("cors");

// Allow all origins
app.use(cors());
const port = 4004;

const startServer = async () => {
  try {
    await pool.connect(); // Connect to the database
    console.log("Database connected successfully.");

    // Start the server after DB connection
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Exit if database connection fails
  }
};

// Call the function to start the server
startServer();
