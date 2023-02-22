import { combineReducers } from 'redux';
import appReducer from './appReducer';
import profileReducer from './profileReducer';
import persistReducer from 'redux-persist/es/persistReducer';
import authReducer from './authReducer';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
const commonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const authPersistConfig = {
    ...commonConfig,
    key: 'auth',
    whitelist: ['token', 'isLogin'],
};

const rootReducer = combineReducers({
    app: appReducer,
    profile: profileReducer,
    auth: persistReducer(authPersistConfig, authReducer),
});

export default rootReducer;
