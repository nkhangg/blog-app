import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Auth from '../model/authShema.js';
import argon2d from 'argon2';

dotenv.config();

const createToken = (id) => {
    return jwt.sign({ data: id }, process.env.SECRET_KEY, { expiresIn: '1h' });
};

export const getAuth = () => {};

export const register = async (req, res) => {
    try {
        const { username, password, ...data } = req.body;
        const user = await Auth.findOne({ username });

        if (user) {
            return res.json({
                err: 1,
                mess: 'Failsure, auth already !',
                token: null,
            });
        }

        const hashPass = await argon2d.hash(password);

        const newAuth = await Auth.create({
            username,
            password: hashPass,
            ...data,
        });

        if (newAuth) {
            res.json({
                err: 0,
                mess: 'Successfuly !',
                token: `Bear ${createToken(newAuth._id)}`,
            });
        }
    } catch (error) {
        res.json({
            err: 1,
            mess: 'Failsure !',
            token: null,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const auth = await Auth.findOne({ username });
        const cp = await argon2d.verify(auth.password, password);
        if (username === auth.username && cp) {
            res.json({
                err: 0,
                mess: 'Successfuly !',
                token: `Bear ${createToken(auth._id)}`,
            });
        } else {
            res.json({
                err: 1,
                mess: 'incoret username or password !',
                token: null,
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            err: 1,
            mess: 'Failsure !',
            token: null,
        });
    }
};

export const getUser = async (req, res) => {
    try {
        const { id } = req.body;
        const responce = await Auth.findOne({ _id: id });

        if (responce) {
            res.json({
                err: 0,
                mess: 'Get user successfuly !',
                data: responce,
            });
        }
    } catch (error) {
        res.json({
            err: 1,
            mess: 'Get user fail',
        });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const { id } = req.query;
        const responce = await Auth.findOne({ _id: id });

        if (responce) {
            res.json({
                err: 0,
                mess: 'Get user successfuly !',
                data: responce,
            });
        }
    } catch (error) {
        res.json({
            err: 1,
            mess: 'Get user fail',
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.body;
        const responce = await Auth.findByIdAndUpdate(
            { _id: id },
            {
                ...req.body,
            },
            { new: true },
        );

        if (responce) {
            res.json({
                err: 0,
                mess: 'Update user successfuly !',
                data: responce,
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            err: 1,
            mess: 'Update user fail',
        });
    }
};
