import axiosConfig from './axios';

export const apiGetUser = (token) =>
    new Promise(async (resovle, reject) => {
        try {
            const res = await axiosConfig({
                url: '/user',
                method: 'get',
                headers: {
                    authorization: token,
                },
            });

            resovle(res);
        } catch (error) {
            reject(error);
        }
    });

export const apiUpdateUser = (data, token) =>
    new Promise(async (resovle, reject) => {
        try {
            const res = await axiosConfig({
                url: '/user',
                method: 'put',
                headers: {
                    authorization: token,
                },
                data,
            });

            resovle(res);
        } catch (error) {
            reject(error);
        }
    });
