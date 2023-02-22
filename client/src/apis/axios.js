import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
});

axios.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

axios.interceptors.response.use(
    function (responce) {
        return responce;
    },
    function (error) {
        return Promise.reject(error);
    },
);

export default instance;
