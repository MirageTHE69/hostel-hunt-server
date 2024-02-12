import express from 'express';
import * as authController from '../controller/auth.controller.js';
import * as  userController from '../controller/user.controller.js'

const router = express.Router();

// User registration route
router.post('/register', authController.signUp);

// User login route
router.post('/login', authController.login);

router.get('/users', userController.getAllUsers);


// Export the router
export default router;
