import React from 'react';
import { Logo, NarBarItem } from '../component';
import { menu } from '../ultil/menu';
import { AnimatePresence, motion } from 'framer-motion';

const NavBar = ({ hide }) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{
                    x: '-100%',
                }}
                transition={{ delay: 0.2 }}
                className={`w-1/6 bg-white ${hide ? 'hidden' : 'flex'} flex-col gap-[80px] p-10`}
            >
                <div className="">
                    <Logo />
                </div>
                <div className="flex flex-col flex-1 gap-10 justify-start items-center">
                    {menu.map((item) => {
                        return <NarBarItem key={item.title} active={true} data={item} />;
                    })}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default NavBar;
