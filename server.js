require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRouter = require("./router/userRouter");

const app = express();

connectDB();

app.use(cors());
app.use(express.json()); // needed so req.body works for POST and PUT

app.use("/api/users", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));