import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';
import { apiDelPost } from '../apis/post';
import WraperPopup from './WraperPopup';

const Popup = () => {
    const { idDel, isHidePopupDel } = useSelector((state) => state.app);
    const { isLogin, user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const fetch = async () => {
        if (isLogin && token) {
            dispatch(actions.setLoading(true));
            const res = await apiDelPost(idDel);
            dispatch(actions.setLoading(false));

            if (res?.data?.err === 0) {
                dispatch(actions.getPostProfile(user?._id));
                dispatch(actions.setIsHideDel(false));
            }
        }
    };

    useEffect(() => {
        if (isLogin && token) {
            dispatch(actions.getPostProfile(user?._id));
        }
    }, [user, token, dispatch, isLogin]);

    const handleDel = () => {
        fetch();
    };
    return (
        <WraperPopup isHide={isHidePopupDel}>
            <motion.div
                initial={{
                    opacity: 0,
                    y: 200,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.4,
                }}
                exit={{
                    opacity: 0,
                    y: -100,
                }}
                className="h-[150px] w-[400px] bg-white rounded-xl p-5 flex flex-col justify-between"
            >
                <h4 className="font-bold text-2xl">{'Are you sure ?'}</h4>
                <div className="flex justify-end gap-[28px]">
                    <motion.button
                        onClick={(e) => handleDel(e)}
                        whileTap={{
                            scale: 0.8,
                        }}
                        className="w-[100px] h-[40px] border-2 border-gray-400 rounded-md font-bold text-lg"
                    >
                        Yes
                    </motion.button>
                    <motion.button
                        onClick={() => dispatch(actions.setIsHideDel(false))}
                        whileTap={{
                            scale: 0.8,
                        }}
                        className="w-[100px] h-[40px] border-2 border-gray-400 rounded-md font-bold text-lg"
                    >
                        No
                    </motion.button>
                </div>
            </motion.div>
        </WraperPopup>
    );
};

export default Popup;
