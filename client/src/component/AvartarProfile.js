import React, { memo, useState } from 'react';
import WraperTippy from './WraperTippy';
import * as actions from '../store/actions';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { BsEye } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';
import DefaultImage from './DefaultImage';
import moment from 'moment';
const AvartarProfile = ({ memoUser }) => {
    const [isHideAvartar, setIsHideAvartar] = useState(false);
    const dispatch = useDispatch();

    const handlePopup = (e) => {
        dispatch(actions.setIUpdateProfilePopup(memoUser?.image ? memoUser?.image : null));
    };

    return (
        <div className="flex gap-10 items-center">
            <WraperTippy
                placement="bottom"
                isHide={isHideAvartar}
                setIsHide={setIsHideAvartar}
                render={
                    <div className="w-[100px] bg-white shadow-lg border border-gray-400 rounded-lg overflow-hidden text-gray-400 select-none">
                        <motion.span
                            onClick={() => dispatch(actions.setImgPopup(memoUser?.image))}
                            whileTap={{
                                scale: 0.8,
                            }}
                            className="flex items-center w-full h-[40px] gap-2 cursor-pointer hover:bg-gray-300 p-2 hover:text-black"
                        >
                            <span>
                                <BsEye />
                            </span>
                            <span>Avatar</span>
                        </motion.span>
                        <motion.span
                            onClick={(e) => handlePopup(e)}
                            whileTap={{
                                scale: 0.8,
                            }}
                            className="flex items-center w-full h-[40px] gap-2 cursor-pointer hover:bg-gray-300 p-2 hover:text-black"
                        >
                            <span>
                                <FiEdit2 />
                            </span>
                            <span>Edit</span>
                        </motion.span>
                    </div>
                }
            >
                <motion.div
                    onClick={() => setIsHideAvartar((prev) => !prev)}
                    initial={{
                        y: '-100%',
                        opacity: 0,
                    }}
                    animate={{ y: 0, opacity: 1 }}
                    className="h-[200px] w-[200px] rounded-full overflow-hidden border-4 border-gray-400 cursor-pointer"
                >
                    {memoUser?.image ? (
                        <motion.img
                            whileHover={{
                                scale: 1.1,
                            }}
                            src={memoUser?.image}
                            alt="avatar"
                            className="h-full w-full rounded-full object-cover"
                        />
                    ) : (
                        <DefaultImage />
                    )}
                </motion.div>
            </WraperTippy>

            <motion.div
                initial={{
                    x: '-100%',
                    opacity: 0,
                }}
                animate={{ x: 0, opacity: 1 }}
                className="flex flex-col gap-4"
            >
                <h2 className="text-2xl font-bold">{memoUser?.username}</h2>
                <div className="flex flex-col gap-2 text-gray-400">
                    <span>Email: {memoUser?.email}</span>
                    <span>Address: {memoUser?.address}</span>
                    <span>Participation: {moment(memoUser?.createdAt).fromNow()}</span>
                </div>
            </motion.div>
        </div>
    );
};

export default memo(AvartarProfile);
