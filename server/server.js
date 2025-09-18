const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/db/conn");
const errorHandler = require("./src/middleware/errorMiddleware");
const companyRoutes = require("./src/routes/companyRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to database
connectDB();

// Allow requests from all origins
app.use(cors({ origin: "*" }));

// Parse incoming JSON requests
app.use(express.json());

// Routes
app.use("/api/companies", companyRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error while starting server:", error);
  }
}

startServer();
