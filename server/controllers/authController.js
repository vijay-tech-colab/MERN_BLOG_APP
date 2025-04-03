import jwt from 'jsonwebtoken';
import { handleError } from "../helper/handleError.js";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
export const Register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            next(handleError(404, "User already registered"))
        }
        const hashPassword = bcrypt.hashSync(password, 10);
        const user = await User({
            name, password: hashPassword, email
        });
        await user.save();
        res.status(201).json({
            success: true,
            message: "Registration successfull"
        })
    } catch (error) {
        next(handleError(500, error.message));
    }
}


export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return next(handleError(404, "User not found"));
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if (!isMatch) {
            return next(handleError(401, "Invalid credentials"));
        }
        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Send token as cookie
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/'
        }).status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (error) {
        next(handleError(500, error.message));
    }
};


export const GoogleLogin = async (req, res, next) => {
    try {
        const { name, email, avatar } = req.body;


        let user;
        await User.findOne({ email });
        if (!user) {
            const password = String(Math.floor(Math.random() * 1000000));
            const hashPassword = bcrypt.hashSync(password, 10);
            const newUser = new User({
                name, password: hashPassword, email, avatar
            })
            user = await newUser.save();
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Send token as cookie
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/'
        }).status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (error) {
        next(handleError(500, error.message));
    }
};
