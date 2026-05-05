 
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
const goalRoutes = require("./routes/goalRoutes");
 
 


const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/users", userRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/goals", goalRoutes);

// Connect to MongoDB and start server
mongoose.connect("mongodb://localhost:27017/financeDB")
  .then(() => console.log(" MongoDB Connected"))
  .catch(err => console.error(err));

app.listen(5000, () => console.log(" Server running on port 5000"));



 