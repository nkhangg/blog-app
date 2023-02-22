import React, { useEffect, useMemo } from 'react';
import { NonData, PostItems } from '../component';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';
import { initPageName } from '../ultil/app';
import Scrollbars from 'react-custom-scrollbars-2';
const Home = () => {
    const { homeData } = useSelector((state) => state.app);

    const dispatch = useDispatch();

    const memoHomeData = useMemo(() => {
        return homeData;
    }, [homeData]);

    useEffect(() => {
        dispatch(actions.setLoading(true));
        dispatch(actions.getDataHome());
        dispatch(actions.setLoading(false));

        return () => {
            dispatch(actions.setIsHideDel(false));
        };
    }, [dispatch]);

    useEffect(() => {
        initPageName(dispatch, 1);
    }, [dispatch]);

    return (
        <>
            {memoHomeData ? (
                <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
                    <PostItems data={memoHomeData} hideControl />
                </Scrollbars>
            ) : (
                <NonData title={'There are no posts yet'} toTitle={'Create a new post !'} />
            )}
        </>
    );
};

export default Home;
