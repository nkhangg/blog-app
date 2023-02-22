import React from 'react';
import { Link } from 'react-router-dom';
import { path } from '../ultil/path';

const Logo = () => {
    return (
        <Link to={path.home} className="flex gap-[2px] justify-center items-center">
            <div className="h-[80px] w-[20px] bg-[#ff3693bf] rounded-lg rotate-[15deg]"></div>
            <div className="h-[80px] w-[20px] bg-[#ff3693] rounded-lg rotate-[15deg]"></div>
            <div className="h-[80px] w-[20px] bg-[#ff3693bf] rounded-lg rotate-[15deg]"></div>
        </Link>
    );
};

export default Logo;
