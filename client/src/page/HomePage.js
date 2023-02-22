import React from 'react';
import { Add, ShowImg } from '../component';
import Header from './Header';
import { motion } from 'framer-motion';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import NewPost from './NewPost';
import Update from './Update';
import Play from './Play';
import DetailPost from './DetailPost';
import { path } from '../ultil/path';
import Sign from './Sign';
import { ToastContainer } from 'react-toastify';
import Profile from './Profile';
import Loading from '../component/Loading';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-between gap-[28px] w-5/6  m-[28px]">
            <Header />
            <Add />

            <motion.div
                initial={{ x: '110%' }}
                animate={{
                    x: 0,
                }}
                transition={{ delay: 0.2 }}
                className="w-full h-[90%] p-10 bg-white rounded-3xl shadow-lg"
            >
                <Routes>
                    <Route element={<Home />} path={path.home} />
                    <Route element={<NewPost />} path={path.newPost} />
                    <Route element={<Update />} path={path.update} />
                    <Route element={<Profile />} path={path.me} />
                    <Route element={<Play />} path={path.notidy} />
                    <Route element={<DetailPost />} path={path.detail} />
                    <Route element={<Home />} path={path.default} />
                    <Route element={<Sign />} path={path.login} />
                    <Route element={<Sign />} path={path.register} />
                </Routes>
            </motion.div>

            <ShowImg />
            <Loading />
            <ToastContainer />
        </div>
    );
};

export default HomePage;
