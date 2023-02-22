import express from 'express';
import * as controller from '../controller/auth.js';
import { validateLogin, validateRegister, veryfiToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', validateRegister, controller.register);
router.post('/login', validateLogin, controller.login);
router.get('/user', veryfiToken, controller.getUser);
router.get('/user-profile', controller.getUserProfile);
router.put('/user', veryfiToken, controller.updateUser);

export default router;
