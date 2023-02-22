import React, { memo, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import WraperTippy from './WraperTippy';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { MdOutlineLogout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';
import AvartarProfile from './AvartarProfile';
const UpdateProfile = () => {
    const [isHide, setIsHide] = useState(false);
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const memoUser = useMemo(() => {
        return user;
    }, [user]);

    return (
        <>
            <div className="">
                <div className="flex justify-between border-b border-gray-400 pb-7">
                    <AvartarProfile memoUser={memoUser} />
                    <motion.div
                        initial={{
                            x: '100%',
                            opacity: 0,
                        }}
                        animate={{ x: 0, opacity: 1 }}
                        className="text-gray-400 text-2xl"
                    >
                        <WraperTippy
                            setIsHide={setIsHide}
                            isHide={isHide}
                            render={
                                <motion.span
                                    onClick={() => dispatch(actions.logout())}
                                    whileTap={{
                                        scale: 0.8,
                                    }}
                                    className="flex text-lg items-center gap-2 cursor-pointer p-2 select-none border
                           border-gray-400 w-[140px] rounded-lg shadow-lg hover:text-black"
                                >
                                    <span>
                                        <MdOutlineLogout />
                                    </span>
                                    <span>Logout</span>
                                </motion.span>
                            }
                        >
                            <span
                                onClick={() => setIsHide((prev) => !prev)}
                                className="cursor-pointer h-[40px] w-[40px] hover:bg-gray-200 
                                flex items-center justify-center rounded-full select-none"
                            >
                                <HiOutlineDotsHorizontal />
                            </span>
                        </WraperTippy>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default memo(UpdateProfile);
