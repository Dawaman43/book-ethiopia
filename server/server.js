require("dotenv").config();
const express = require("express");
const cors = require("cors");
const createConnection = require("./configs/db");
const authRoutes = require("./routes/auth.routes");

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
createConnection();

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
