import { apiGetPostUser } from '../../apis/post';
import { actionType } from './acitonType';

export const getPostProfile = (id) => async (dispatch) => {
    const res = await apiGetPostUser(id);
    try {
        if (res.data.err === 0) {
            dispatch({ type: actionType.SET_DATA_PROFILE, data: res?.data?.data });
        } else {
            dispatch({ type: actionType.SET_DATA_PROFILE, data: null });
        }
    } catch (error) {
        dispatch({ type: actionType.SET_DATA_PROFILE, data: null });
    }
};

export const setImgPopup = (data) => {
    return {
        type: actionType.SET_POPUP_IMG,
        data,
    };
};

export const setIUpdateProfilePopup = (data) => {
    return {
        type: actionType.SET_UPDATE_PROFILE_POPUP,
        data,
    };
};
export const setLoading = (flag) => {
    return {
        type: actionType.SET_LOADING,
        flag,
    };
};
