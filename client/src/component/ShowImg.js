import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WraperPopup from './WraperPopup';
import * as actions from '../store/actions/profile';

const ShowImg = () => {
    const { popupImg } = useSelector((state) => state.profile);
    const [isHide, setIsHide] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        popupImg ? setIsHide(true) : setIsHide(false);
    }, [popupImg]);

    return (
        <WraperPopup setFn={() => dispatch(actions.setImgPopup(''))} isHide={isHide} setHide={setIsHide}>
            <div className="w-[500px] p-4 bg-white rounded-lg">
                <img src={popupImg && popupImg} alt="img" className="object-cover w-full h-full" />
            </div>
        </WraperPopup>
    );
};

export default memo(ShowImg);
