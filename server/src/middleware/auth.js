import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const veryfiToken = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];

        const c = jwt.verify(token, process.env.SECRET_KEY);

        if (!c) {
            return res.json({
                err: 1,
                mess: 'invalid token !',
            });
        }
        req.body.id = c.data;

        next();
    } catch (error) {
        return res.json({
            err: 1,
            mess: 'invalid token !',
        });
    }
};

export const validateRegister = (req, res, next) => {
    const { username, password, address, email } = req.body;
    if (!username || !password || !address || !email) {
        return res.json({
            err: 1,
            mess: 'some info is null !',
        });
    }
    next();
};

export const validateLogin = (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.json({
                err: 1,
                mess: 'Username or Password is null !',
            });
        } else {
            next();
        }
    } catch (error) {
        return res.json({
            err: 1,
            mess: 'Internal server error !',
        });
    }
};
