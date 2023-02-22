import post from './post.js';
import auth from './auth.js';

const routes = (app) => {
    app.use('/api/v1/post', post);
    app.use('/api/v1/', auth);
};

export default routes;
