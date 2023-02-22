const { actionType } = require('../actions/acitonType');

const init = {
    curPage: {
        pageName: 'Home',
        pageId: 1,
    },
    homeData: [],
    idDel: null,
    idUpdate: null,
    isHidePopupDel: false,
    loginMode: false,
    registerMode: false,
};

const appReducer = (state = init, action) => {
    switch (action.type) {
        case actionType.GET_HOME:
            return {
                ...state,
                homeData: action.homeData || null,
            };

        case actionType.SET_PAGE_NAME:
            return {
                ...state,
                curPage: {
                    pageName: action.curPage.pageName || 'Home',
                    pageId: action.curPage.pageId || 1,
                },
            };
        case actionType.SET_ID_DEL:
            return {
                ...state,
                idDel: action.id || null,
            };
        case actionType.SET_ID_UPDATE:
            return {
                ...state,
                idUpdate: action.id || null,
            };

        case actionType.SET_IS_HIDE_POPUP_DEL:
            return {
                ...state,
                isHidePopupDel: action.isHide || null,
            };
        case actionType.SET_REGISTER_MODE:
            return {
                ...state,
                registerMode: action.state,
            };
        case actionType.SET_LOGIN_MODE:
            return {
                ...state,
                loginMode: action.state,
            };
        default:
            return state;
    }
};

export default appReducer;
