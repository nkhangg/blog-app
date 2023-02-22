import React, { memo, useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { path } from '../ultil/path';

const Add = () => {
    const navigate = useNavigate();
    const { curPage } = useSelector((state) => state.app);
    const [isHide, setIsHide] = useState(true);

    useEffect(() => {
        curPage.pageId === 2 ? setIsHide(false) : setIsHide(true);
    }, [curPage]);
    return (
        <>
            {isHide && (
                <div
                    onClick={() => {
                        navigate(path.newPost);
                    }}
                    className="fixed bottom-4 right-4 h-[60px] w-[60px] bg-gradient-to-r from-[#6342c347] to-[#ff369347] 
            z-40 rounded-full flex items-center justify-center shadow-2xl cursor-pointer text-gray-500"
                >
                    <AiOutlinePlus size={30} />
                </div>
            )}
        </>
    );
};

export default memo(Add);
