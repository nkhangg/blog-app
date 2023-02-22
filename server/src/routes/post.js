import express from 'express';
import * as controller from '../controller/post.js';
import { veryfiToken } from '../middleware/auth.js';
import { validatePost, validateId } from '../middleware/post.js';

const router = express.Router();

router.get('/', controller.getPost);
router.get('/me', controller.getPostForUser);
router.post('/', veryfiToken, validatePost, controller.createPost);
router.post('/like', veryfiToken, controller.updateLike);
router.post('/dis-like', veryfiToken, controller.updateDisLike);
router.put('/', veryfiToken, validateId, controller.updatePost);
router.delete('/', validateId, controller.deletePost);
router.get('/all', controller.getPosts);

export default router;
