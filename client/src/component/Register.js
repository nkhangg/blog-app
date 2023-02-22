import React, { useEffect, useState } from 'react';
import Input from './Input';
import { motion } from 'framer-motion';
import { apiRegister } from '../apis/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { path } from '../ultil/path';

const Register = () => {
    const [resUsername, setResUsername] = useState(null);
    const [resPass, setResPass] = useState(null);
    const [resAddress, setResAddress] = useState(null);
    const [resEmail, setResEmail] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            setResUsername(null);
            setResPass(null);
            setResAddress(null);
            setResEmail(null);
        };
    }, []);

    const handleRegister = async () => {
        if (!resUsername || !resPass || !resEmail || !resAddress) {
            return;
        }

        if (resUsername?.length <= 0 || resPass?.length <= 0 || resEmail?.length <= 0 || resAddress?.length <= 0) {
            return;
        }
        const res = await apiRegister({
            username: resUsername,
            password: resPass,
            email: resEmail,
            address: resAddress,
        });

        if (res?.data?.err === 0) {
            toast.success(res?.data?.mess);
            navigate(path.login);
        } else {
            toast.warning(res?.data?.mess);
        }
    };
    return (
        <div className=" p-10 m-auto flex justify-between border-2 shadow-lg border-gray-400 rounded-lg gap-[28px]">
            <div className="w-1/2 flex flex-col gap-[28px]">
                <Input
                    err={'Username is null'}
                    title="Username"
                    type={'text'}
                    setData={setResUsername}
                    data={resUsername}
                />

                <Input
                    err={'Password is null'}
                    title="Password"
                    type={'password'}
                    setData={setResPass}
                    data={resPass}
                />
            </div>

            <div className="w-1/2 flex flex-col gap-[28px]">
                <Input err={'Email is null'} title="Email" type={'email'} setData={setResEmail} data={resEmail} />

                <Input
                    err={'Address is null'}
                    title="Address"
                    type={'text'}
                    setData={setResAddress}
                    data={resAddress}
                />

                <div className="flex flex-col gap-4 items-end">
                    <motion.button
                        onClick={(e) => handleRegister(e)}
                        whileTap={{ scale: 0.8 }}
                        className="w-[100px] h-[40px] border-2 borde-gray-400 outline-none text-lg font-bold rounded-lg shadow-lg"
                    >
                        Submit
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default Register;
