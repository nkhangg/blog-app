import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

const WraperPopup = ({ children, isHide, setHide = () => {}, setFn }) => {
    return (
        <>
            <AnimatePresence onExitComplete={setFn}>
                {isHide && (
                    <motion.div
                        onClick={(e) => setHide(false)}
                        initial={{
                            scale: 0,
                        }}
                        animate={{
                            scale: 1,
                        }}
                        transition={{
                            duration: 0.4,
                        }}
                        exit={{
                            scale: 0,
                            transition: {
                                delay: 0.4,
                            },
                        }}
                        className="absolute inset-0 bg-[rgba(0,0,0,0.4)] rounded-3xl flex justify-center items-center z-[9999]"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default WraperPopup;
