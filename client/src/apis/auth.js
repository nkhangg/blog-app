import axiosConfig from './axios';

export const apiRegister = (data) =>
    new Promise(async (resovle, reject) => {
        try {
            const res = await axiosConfig({
                url: '/register',
                method: 'post',
                data,
            });

            resovle(res);
        } catch (error) {
            reject(error);
        }
    });

export const apiLogin = (data) =>
    new Promise(async (resovle, reject) => {
        try {
            const res = await axiosConfig({
                url: '/login',
                method: 'post',
                data,
            });

            resovle(res);
        } catch (error) {
            reject(error);
        }
    });
