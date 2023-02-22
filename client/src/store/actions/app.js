import { apiGetPosts } from '../../apis/post';
import { actionType } from './acitonType';
export const setPageName = (curPage) => {
    return {
        type: actionType.SET_PAGE_NAME,
        curPage,
    };
};

export const setIdDel = (id) => {
    return {
        type: actionType.SET_ID_DEL,
        id,
    };
};
export const setIdUpdate = (id) => {
    return {
        type: actionType.SET_ID_UPDATE,
        id,
    };
};
export const setIsHideDel = (isHide) => {
    return {
        type: actionType.SET_IS_HIDE_POPUP_DEL,
        isHide,
    };
};

export const setLoginMode = (state) => {
    return {
        type: actionType.SET_LOGIN_MODE,
        state,
    };
};
export const setRegisterMode = (state) => {
    return {
        type: actionType.SET_REGISTER_MODE,
        state,
    };
};
export const getDataHome = () => async (dispatch) => {
    const res = await apiGetPosts();

    try {
        if (res.data.err === 0) {
            dispatch({ type: actionType.GET_HOME, homeData: res?.data?.data });
        } else {
            dispatch({ type: actionType.GET_HOME, homeData: null });
        }
    } catch (error) {
        dispatch({ type: actionType.GET_HOME, homeData: null });
    }
};
