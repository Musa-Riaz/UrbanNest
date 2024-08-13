const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");


const app = express();
dotenv.config({path: "./config.env"});  

mongoose.connect(process.env.DB_STRING, {
    dbName: process.env.DB_NAME,
}).then(() => {
    console.log("Database connected");
}).catch((err) =>{
    console.log(err);
});


app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("api/v1/user", userRouter);

app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${process.env.PORT}`);
});
