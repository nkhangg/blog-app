import React from 'react';
import { motion } from 'framer-motion';
import PostItem from './PostItem';

const PostItems = ({ data, className, hideControl, delay = 0 }) => {
    const container = {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,

            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1,
                delay,
            },
        },
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };
    return (
        <div className={className}>
            <motion.div variants={container} initial="hidden" animate="visible" className="grid grid-cols-3 gap-[28px]">
                {data &&
                    data?.map((i) => {
                        return <PostItem key={i._id} variants={item} data={i} del hideControl={hideControl} />;
                    })}
            </motion.div>
        </div>
    );
};

export default PostItems;
