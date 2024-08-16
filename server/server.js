const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const cookieParser = require("cookie-parser");
const {errorMiddleware} = require("./middlewares/errorMiddleware");
const app = express();
dotenv.config({path: "../config.env"});  

mongoose.connect(process.env.DB_STRING, {
    dbName: process.env.DB_NAME,
}).then(() => {
    console.log("Database connected");
}).catch((err) =>{
    console.log(err);
});


app.use(cors({credentials: true, origin: "http://localhost:5173"}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser({ }));


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);


app.use(errorMiddleware);

app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${process.env.PORT}`);
});
