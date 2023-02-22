import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineLogout } from 'react-icons/md';
import * as actions from '../store/actions';
import { path } from '../ultil/path';
import { DefaultImage, WraperTippy } from '../component';

const Header = () => {
    const { curPage, loginMode } = useSelector((state) => state.app);
    const { isLogin, token, user } = useSelector((state) => state.auth);
    const [curUser, setCurUser] = useState(user);
    const [isHide, setIsHide] = useState(false);

    const location = useLocation();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ref = useRef();

    useEffect(() => {
        dispatch(actions.setUser(token));
    }, [isLogin, dispatch, token]);

    useEffect(() => {
        setCurUser(user);
    }, [user]);

    const handleClick = (e) => {
        if (location.pathname !== path.login && location.pathname !== path.register) {
            navigate(path.login);
            return;
        }

        if (location.pathname === path.login) {
            navigate(path.register);
            dispatch(actions.setRegisterMode(true));
            dispatch(actions.setLoginMode(false));
        } else if (location.pathname === path.register) {
            navigate(path.login);
            dispatch(actions.setLoginMode(true));
            dispatch(actions.setRegisterMode(false));
            ref.current.innerText = 'Login';
        }
    };

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                setIsHide(false);
            }}
            className="w-full h-[10%] p-10 flex items-center justify-between"
        >
            <div className="flex items-center gap-6">
                <h1 className="font-bold text-3xl">{curPage.pageName}</h1>
                <div className="flex items-center gap-4">
                    <motion.span
                        whileHover={{ x: -4 }}
                        onClick={() => navigate(-1)}
                        className="text-gray-400 cursor-pointer"
                    >
                        <HiOutlineArrowLeft size={25} />
                    </motion.span>
                    <motion.span
                        whileHover={{ x: 4 }}
                        onClick={() => navigate(1)}
                        className="text-gray-400 cursor-pointer"
                    >
                        <HiOutlineArrowRight size={25} />
                    </motion.span>
                </div>
            </div>
            {isLogin && curUser ? (
                <div className="flex gap-4 items-center justify-between overflow-hidden">
                    <WraperTippy
                        isHide={isHide}
                        render={
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white border-2 border-gray-400 shadow-lg flex flex-col w-[120px] justify-center items-center
                            rounded-lg "
                            >
                                <motion.span
                                    onClick={() => {
                                        navigate(path.me);
                                        setIsHide(false);
                                    }}
                                    whileTap={{
                                        scale: 0.8,
                                    }}
                                    className="h-[40px] w-full flex items-center justify-center cursor-pointer hover:bg-gray-300 font-bold 
                                border-b border-gray-400 select-none gap-2 rounded-t-lg"
                                >
                                    <CgProfile size={18} />
                                    <span>Profile</span>
                                </motion.span>
                                <motion.span
                                    onClick={() => {
                                        setIsHide(false);
                                        navigate(path.home);
                                        dispatch(actions.logout());
                                    }}
                                    whileTap={{
                                        scale: 0.8,
                                    }}
                                    className="h-[40px] w-full flex items-center justify-center cursor-pointer hover:bg-gray-300 
                                    font-bold select-none  border-t border-gray-400 gap-2 rounded-b-lg "
                                >
                                    <MdOutlineLogout size={18} />
                                    <span>Logout</span>
                                </motion.span>
                            </div>
                        }
                    >
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsHide((prev) => !prev);
                            }}
                            className="h-[60px] w-[60px] rounded-full overflow-hidden cursor-pointer border border-gray-400"
                        >
                            {curUser?.image ? (
                                <img className="h-full w-full object-cover" src={curUser?.image} alt="avartar" />
                            ) : (
                                <DefaultImage />
                            )}
                        </div>
                    </WraperTippy>
                    <div className="flex flex-col gap-1">
                        <h4 className="text-lg font-[500] text-gray-900">{curUser?.username}</h4>
                        <span className="text-xs font-mono text-gray-400">
                            {curUser?.email.length > 15 ? curUser?.email.slice(0, 15) + '...' : curUser?.email}
                        </span>
                    </div>
                </div>
            ) : (
                <motion.button
                    ref={ref}
                    onClick={(e) => handleClick(e)}
                    whileTap={{ scale: 0.8 }}
                    className="w-[100px] h-[50px] border-2 border-gray-400 text-gray-400 text-xl font-bold rounded-lg shadow-lg"
                >
                    {loginMode ? 'Register' : 'Login'}
                </motion.button>
            )}
        </div>
    );
};

export default Header;
