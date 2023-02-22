import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { path } from '../ultil/path';

const NonData = ({ title, toTitle }) => {
    return (
        <motion.div
            initial={{
                y: -200,
                opacity: 0,
            }}
            animate={{
                y: 0,
                opacity: 1,
            }}
            className="flex gap-2 justify-center items-center text-gray-400 text-lg"
        >
            <h4>{title}</h4>
            <Link to={path.newPost} className="underline cursor-pointer">
                {toTitle}
            </Link>
        </motion.div>
    );
};

export default NonData;
