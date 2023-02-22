import { apiGetUser } from '../../apis/user';
import { actionType } from './acitonType';

export const setToken = (token) => {
    return {
        type: actionType.SET_TOKEN,
        token,
    };
};

export const logout = () => {
    return {
        type: actionType.LOG_OUT,
        flag: true,
    };
};

export const setUser = (token) => async (dispatch) => {
    try {
        const res = await apiGetUser(token);
        if (res?.data?.err === 0) {
            dispatch({
                type: actionType.SET_USER_LOGIN,
                data: res?.data?.data,
            });
        } else {
            dispatch({
                type: actionType.SET_USER_LOGIN,
                data: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionType.SET_USER_LOGIN,
            data: null,
        });
    }
};
