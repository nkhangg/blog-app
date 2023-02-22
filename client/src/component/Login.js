import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { apiLogin } from '../apis/auth';
import { path } from '../ultil/path';
import Input from './Input';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions/auth';

const Login = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        if (!username || !password) {
            toast.warning('Enter your acccount !');
            return;
        }

        if (username?.length <= 0 || password?.length <= 0) {
            return;
        }

        const res = await apiLogin({
            username,
            password,
        });

        if (res?.data?.err === 0) {
            toast.success(res?.data?.mess);
            dispatch(actions.setToken(res?.data?.token));
            navigate(path.home);
        } else {
            toast.error(res?.data?.mess);
        }
    };
    return (
        <div className="w-1/2 p-10 m-auto flex flex-col gap-10 border-2 shadow-lg border-gray-400 rounded-lg">
            <Input
                err={'Username is not null !'}
                title={'Username'}
                data={username}
                setData={setUsername}
                type={'text'}
            />

            <Input
                err={'Password is not null !'}
                title={'Password'}
                data={password}
                setData={setPassword}
                type={'password'}
            />

            <div className="flex flex-col gap-4 items-center">
                <motion.button
                    onClick={(e) => handleLogin(e)}
                    whileTap={{ scale: 0.8 }}
                    className="w-[100px] h-[40px] border-2 borde-gray-400 outline-none text-lg font-bold rounded-lg shadow-lg"
                >
                    Submit
                </motion.button>
            </div>
        </div>
    );
};

export default Login;
