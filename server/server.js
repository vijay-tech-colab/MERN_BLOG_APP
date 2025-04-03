import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js"
dotenv.config();
const app = express();
const Port = process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use('/api/auth', authRoute)
mongoose.connect(process.env.MONGO_URI, { dbName: 'BLOG_APP_WITH_MERN' }).then(() => console.log('CONNECTED'))
app.listen(Port, () => {
    console.log("serever running");
})


app.use((err, req, res, next) => {
    console.error("Error:", err); // Logs the full error for debugging

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Handle MongoDB duplicate key error (E11000)
    if (err.code && err.code === 11000) {
        statusCode = 400;
        message = `Duplicate value entered for ${Object.keys(err.keyValue)} field!`;
    }

    // Handle Mongoose validation errors
    if (err.name === "ValidationError" && err.errors) {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(", ");
    }

    // Handle JWT errors
    if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid token! Please log in again.";
    }

    if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Token expired! Please log in again.";
    }

    console.log("Global Error:", message, err.name);

    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

