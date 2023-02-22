import React, { useEffect, useState } from 'react';
import DefaultImage from './DefaultImage';
import Input from './Input';
import WraperPopup from './WraperPopup';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { apiUpdateUser } from '../apis/user';
import { toast } from 'react-toastify';
import * as actions from '../store/actions';

const PopupProfile = () => {
    const { isLogin, user, token } = useSelector((state) => state.auth);
    const { popupProfile } = useSelector((state) => state.profile);
    const [isHidePopup, setIsHidePopup] = useState(false);
    const [dataImagge, setDataImagge] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (popupProfile) {
            setIsHidePopup(true);
            setDataImagge(popupProfile);
        } else {
            setIsHidePopup(false);
            setDataImagge(null);
        }

        // return () => dispatch(actions.setIUpdateProfilePopup(null));
    }, [popupProfile]);

    useEffect(() => {
        return () => dispatch(actions.setIUpdateProfilePopup(null));
    }, [dispatch]);

    const handleUpdate = async () => {
        if (!token || !isLogin) {
            return;
        }

        if (user?.image === dataImagge) {
            return;
        }

        const res = await apiUpdateUser({ ...user, image: dataImagge }, token);

        if (res?.data?.err === 0) {
            toast.success(res?.data?.mess);
            dispatch(actions.setUser(token));
            setIsHidePopup(false);
        } else {
            toast.error(res?.data?.mess);
        }
    };
    return (
        <WraperPopup
            setFn={() => dispatch(actions.setIUpdateProfilePopup(null))}
            isHide={isHidePopup}
            setHide={setIsHidePopup}
        >
            <div
                className="flex flex-col gap-10 w-[400px] bg-white p-5 items-center justify-center rounded-lg shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-[250px] h-[250px] overflow-hidden rounded-full border-4 border-gray-400">
                    {dataImagge || user?.image ? (
                        <img src={dataImagge} alt="avartar" className="w-full h-full object-cover" />
                    ) : (
                        <DefaultImage />
                    )}
                </div>
                <div className="flex flex-col items-center justify-center">
                    <Input
                        err={'Link avartar is null'}
                        title={'Link Your Avartar'}
                        data={dataImagge}
                        setData={setDataImagge}
                    />
                    <motion.button
                        onClick={(e) => handleUpdate(e)}
                        whileTap={{
                            scale: 0.8,
                        }}
                        className="w-full h-[40px] border-gray-400 border-2 rounded-lg shadow-lg font-bold text-lg"
                    >
                        Update
                    </motion.button>
                </div>
            </div>
        </WraperPopup>
    );
};

export default PopupProfile;
