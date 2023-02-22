const { actionType } = require('../actions/acitonType');

const init = {
    token: null,
    isLogin: false,
};

const authReducer = (state = init, action) => {
    switch (action.type) {
        case actionType.SET_TOKEN:
            return {
                ...state,
                token: action.token || null,
                isLogin: action.token ? true : false,
            };

        case actionType.LOG_OUT:
            return {
                ...state,
                token: action.flag && null,
                isLogin: !action.flag,
            };
        case actionType.SET_USER_LOGIN:
            return {
                ...state,
                user: action.data || null,
            };

        default:
            return state;
    }
};

export default authReducer;
