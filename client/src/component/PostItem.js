import React, { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiFillDelete, AiFillEdit, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import Tippy from '@tippyjs/react/headless';
import * as actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initPageName } from '../ultil/app';
import { path } from '../ultil/path';
import { apiDisLike, apiLike } from '../apis/post';

const PostItem = ({ variants, data, del, hideControl, isHideHeart }) => {
    const { isLogin, token, user } = useSelector((state) => state.auth);
    const [isHideDel, setIsHideDel] = useState(false);
    const [isHeartActive, setIsHeartActive] = useState(data?.likeId?.includes(user?._id));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { _id, authorId } = data;
    const handleDelete = () => {
        dispatch(actions.setIdDel(_id));
        dispatch(actions.setIsHideDel(true));
    };

    const handleChageEditPage = () => {
        navigate(path.update);
        initPageName(dispatch, 3);
        dispatch(actions.setIdUpdate(_id));
    };

    const handleChangeProfile = () => {
        navigate(`/profile/${_id}/${authorId}`);
    };

    const handleHeart = async () => {
        setIsHeartActive((prev) => !prev);

        if (!isLogin || !token) return;

        if (!isHeartActive) {
            const res = await apiLike(data?._id, token);
            if (res?.data?.err === 0) {
                dispatch(actions.getDataHome());
            }
        } else {
            const res = await apiDisLike(data?._id, token);
            if (res?.data?.err === 0) {
                dispatch(actions.getDataHome());
            }
        }
    };

    useEffect(() => {
        return () => {
            if (isLogin && token) {
                dispatch(actions.getPostProfile(user?._id));
            }
        };
    }, [dispatch, isLogin, token, user]);

    return (
        <motion.div
            variants={variants}
            className="flex h-[300px] rounded-2xl bg-cover bg-no-repeat bg-center p-4 shadow-lg relative"
            style={{
                backgroundImage: `linear-gradient(to right, #6342c333, #ff369333), url(${
                    data.image ? data.image : null
                })`,
            }}
        >
            <motion.div
                initial={{
                    opacity: 0,
                    y: 50,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    delay: 0.3,
                }}
                className="flex flex-col overflow-hidden gap-4 text-gray-100"
            >
                <h2
                    onClick={() => handleChangeProfile()}
                    className="font-semibold text-2xl cursor-pointer hover:underline select-none"
                >
                    {data.title}
                </h2>
            </motion.div>

            {!hideControl && (
                <>
                    <Tippy
                        placement="left"
                        visible={isHideDel}
                        onClickOutside={() => setIsHideDel(false)}
                        interactive={true}
                        render={(attrs) => (
                            <>
                                {del && (
                                    <motion.div
                                        whileTap={{
                                            scale: 0.8,
                                        }}
                                        className="w-[80px] rounded-lg shadow-lg flex flex-col justify-between 
                                    overflow-hidden items-center bg-white font-bold cursor-pointer select-none"
                                        tabIndex="-1"
                                        {...attrs}
                                    >
                                        <motion.span
                                            whileHover={{
                                                backgroundColor: '#ccc',
                                            }}
                                            className="flex justify-between items-center h-[40px] w-full gap-2 p-2"
                                            onClick={() => handleChageEditPage()}
                                        >
                                            <AiFillEdit size={18} />
                                            <span className="flex-1">Edit</span>
                                        </motion.span>
                                        <motion.span
                                            onClick={(e) => handleDelete(e)}
                                            whileHover={{
                                                backgroundColor: '#ccc',
                                            }}
                                            className="flex justify-between items-center h-[40px] w-full gap-1 p-2"
                                        >
                                            <AiFillDelete size={18} />
                                            <span className="flex-1">Delete</span>
                                        </motion.span>
                                    </motion.div>
                                )}
                            </>
                        )}
                    >
                        <motion.div
                            whileTap={{
                                scale: 0.8,
                            }}
                            onClick={(e) => setIsHideDel((prev) => !prev)}
                            className="absolute bottom-3 right-4 h-[40px] w-[40px] rounded-full flex justify-center items-center bg-[rgba(255,255,255,.4)] 
                        text-[rgba(255,255,255,.9)] cursor-pointer select-none"
                        >
                            <BsThreeDotsVertical size={20} />
                        </motion.div>
                    </Tippy>
                </>
            )}

            {!isHideHeart && (
                <motion.div
                    whileTap={{
                        scale: 0.8,
                    }}
                    onClick={(e) => handleHeart(e)}
                    className="absolute bottom-3 left-4 h-[40px] w-[40px] rounded-full flex justify-center items-center bg-[rgba(255,255,255,.4)] 
                    text-[rgba(255,255,255,.9)] cursor-pointer select-none"
                >
                    {isHeartActive ? (
                        <motion.span
                            className="text-red-700"
                            initial={{
                                scale: 0,
                                opacity: 0,
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                            }}
                        >
                            <AiFillHeart size={25} />
                        </motion.span>
                    ) : (
                        <motion.span
                            whileHover={{
                                scale: 1.2,
                                rotate: 15,
                            }}
                        >
                            <AiOutlineHeart size={25} />
                        </motion.span>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
};

export default memo(PostItem);
