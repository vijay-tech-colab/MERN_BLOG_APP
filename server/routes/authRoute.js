import express from 'express'
import { GoogleLogin, Login, Register } from '../controllers/authController.js';
const authRoute = express.Router();

authRoute.post('/register', Register);
authRoute.post('/login', Login);
authRoute.post('/google-login', GoogleLogin);

export default authRoute;