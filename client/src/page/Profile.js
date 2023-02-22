import React, { memo, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { initPageName } from '../ultil/app';
import { path } from '../ultil/path';
import * as actions from '../store/actions';
import { NonData, PostItems, UpdateProfile, PopupProfile, Popup } from '../component';
import Scrollbars from 'react-custom-scrollbars-2';

const Profile = () => {
    const { isLogin, user, token } = useSelector((state) => state.auth);
    const { proData } = useSelector((state) => state.profile);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        initPageName(dispatch, 3);
    }, [dispatch]);

    useEffect(() => {
        if (!isLogin) {
            navigate(path.login);
            toast.warning('Login, please !');
        }
    }, [isLogin, navigate]);

    useEffect(() => {
        if (isLogin && token) {
            dispatch(actions.getPostProfile(user?._id));
        }
    }, [user, token, dispatch, isLogin]);

    const data = useMemo(() => {
        return proData;
    }, [proData]);

    return (
        <>
            <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
                <div className="flex flex-col gap-10">
                    {user ? (
                        <UpdateProfile />
                    ) : (
                        <NonData title={'You are not logged in'} toTitle={'Go to the login page'} />
                    )}

                    {data && data.length > 0 ? (
                        <PostItems data={data} delay={0.2} />
                    ) : (
                        <NonData title={"You don't have any posts yet"} toTitle={'Create a new post !'} />
                    )}
                </div>
            </Scrollbars>
            <PopupProfile isHidePopup={true} />
            <Popup />
        </>
    );
};

export default memo(Profile);
