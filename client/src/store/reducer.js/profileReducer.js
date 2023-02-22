const { actionType } = require('../actions/acitonType');

const init = {
    proData: null,
    popupImg: null,
    popupProfile: null,
    isLoading: false,
};

const profileReducer = (state = init, action) => {
    switch (action.type) {
        case actionType.SET_DATA_PROFILE:
            return {
                ...state,
                proData: action.data || null,
            };
        case actionType.SET_POPUP_IMG:
            return {
                ...state,
                popupImg: action.data || null,
            };
        case actionType.SET_UPDATE_PROFILE_POPUP:
            return {
                ...state,
                popupProfile: action.data || null,
            };
        case actionType.SET_LOADING:
            return {
                ...state,
                isLoading: action.flag || false,
            };

        default:
            return state;
    }
};

export default profileReducer;
