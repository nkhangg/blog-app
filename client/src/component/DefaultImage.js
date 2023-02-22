import React from 'react';
import { BiUser } from 'react-icons/bi';
const DefaultImage = ({ size = 100 }) => {
    return (
        <div className="w-full h-full flex justify-center items-center text-gray-400 text-3xl">
            <BiUser size={size} />
        </div>
    );
};

export default DefaultImage;
