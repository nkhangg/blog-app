import axiosConfig from './axios';

export const apiGetPost = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                url: '/post',
                method: 'get',
                params: { id },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetPosts = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                url: '/post/all',
                method: 'get',
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
export const apiGetPostUser = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                url: '/post/me',
                method: 'get',
                params: { id },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetUserProfile = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                url: '/user-profile',
                method: 'get',
                params: { id },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiPost = (data, token) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                url: '/post',
                method: 'post',
                data,
                headers: {
                    authorization: token,
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiDelPost = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                url: '/post',
                method: 'delete',
                data: { idPost: id },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiUpdatePost = (data, token) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                url: '/post',
                method: 'put',
                data,
                headers: {
                    authorization: token,
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiLike = (idPost, token) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                url: '/post/like',
                method: 'post',
                data: { idPost },
                headers: {
                    authorization: token,
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const apiDisLike = (idPost, token) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                url: '/post/dis-like',
                method: 'post',
                data: { idPost },
                headers: {
                    authorization: token,
                },
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
