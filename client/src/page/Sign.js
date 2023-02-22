import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { path } from '../ultil/path';
import * as actions from '../store/actions/app';
import { Login, Register } from '../component';
import 'react-toastify/dist/ReactToastify.css';

const Sign = () => {
    const dispatch = useDispatch();
    const { loginMode, registerMode } = useSelector((state) => state.app);
    const location = useLocation();
    const { pathname } = location;

    useEffect(() => {
        dispatch(actions.setPageName({ pageName: 'Login', pageId: 5 }));

        return () => {
            dispatch(actions.setLoginMode(false));
            dispatch(actions.setRegisterMode(false));
        };
    }, [dispatch]);

    useEffect(() => {
        if (registerMode) {
            dispatch(actions.setPageName({ pageName: 'Register', pageId: 6 }));
        } else if (loginMode) {
            dispatch(actions.setPageName({ pageName: 'Login', pageId: 5 }));
        }
    }, [registerMode, dispatch, loginMode]);

    useEffect(() => {
        if (pathname === path.login) {
            dispatch(actions.setLoginMode(true));
        } else if (pathname === path.register) {
            dispatch(actions.setRegisterMode(true));
        } else {
            dispatch(actions.setLoginMode(false));
            dispatch(actions.setRegisterMode(false));
        }
    }, [location, dispatch, pathname]);

    return <>{loginMode ? <Login /> : <Register />}</>;
};

export default Sign;
