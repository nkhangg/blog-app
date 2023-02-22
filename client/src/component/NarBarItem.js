import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/app';

const notActive = 'text-[#6342c3] text-[35px] flex items-center justify-center hover:text-[#ff3693] cursor-pointer';
const active = 'text-[#ff3693] text-[35px] flex items-center justify-center hover:text-[#ff3693] cursor-pointer';

const NarBarItem = ({ data }) => {
    const dispath = useDispatch();

    return (
        <NavLink
            onClick={() => dispath(actions.setPageName({ pageName: data.title, pageId: data.id }))}
            to={data.link}
            className={({ isActive }) => (isActive ? active : notActive)}
        >
            {data?.icon}
        </NavLink>
    );
};

export default NarBarItem;
