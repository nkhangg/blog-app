import moment from 'moment/moment';
import React, { useEffect, useRef, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';
import { useParams } from 'react-router-dom';
import DefaultImage from './DefaultImage';
import { apiDisLike, apiLike } from '../apis/post';
import { convertLike } from '../ultil/app';

const ProfileItem = ({ data }) => {
    const { user, isLogin, token } = useSelector((state) => state.auth);
    const [isLike, setIsLike] = useState(data?.likeId ? data?.likeId?.includes(user?._id) : false);

    const ref = useRef();
    const param = useParams();
    const dispatch = useDispatch();

    const { idPost } = param;

    useEffect(() => {
        if (idPost === data._id) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLike = async () => {
        setIsLike((prev) => !prev);
        if (!isLogin || !token) return;

        if (!isLike) {
            const res = await apiLike(data?._id, token);
            if (res?.data?.err === 0) {
                dispatch(actions.getDataHome());
            }
        } else {
            const res = await apiDisLike(data?._id, token);
            if (res?.data?.err === 0) {
                dispatch(actions.getDataHome());
            }
        }
    };

    return (
        <div
            ref={ref}
            className="flex flex-col gap-4 bg-gradient-to-r from-[#6342c333] to-[#ff369333] w-[400px] rounded-lg p-4 overflow-hidden last:mb-5"
        >
            {/* header */}
            <div className="flex flex-col gap-4">
                <div className="flex justify-between ">
                    <div className="flex gap-2 justify-center">
                        {data.avartar ? (
                            <img
                                src={data?.avartar}
                                alt="avartar"
                                className="h-[50px] w-[50px] object-cover rounded-full border-2 border-gray-400 cursor-pointer"
                            />
                        ) : (
                            <span className="h-[50px] w-[50px] object-cover rounded-full border-2 border-gray-400 cursor-pointer">
                                <DefaultImage size={40} />
                            </span>
                        )}

                        <div className="">
                            <h4 className="font-bold cursor-pointer hover:underline">{data?.username}</h4>
                            <span className="text-sm text-gray-400 cursor-default">
                                {moment(data.createdAt).fromNow()}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-2 justify-center items-center">
                        <span className="text-gray-400 rounded-full hover:bg-gray-300 cursor-pointer p-2">
                            <BsThreeDots size={20} />
                        </span>
                    </div>
                </div>
                <div className="">
                    <span>{data.title.length > 300 ? data.title.slice(0, 300) + '...' : data.title}</span>
                </div>
            </div>

            {/* body */}

            <div
                onClick={() => dispatch(actions.setImgPopup(data.image))}
                className="max-h-[400px] overflow-hidden rounded-lg"
            >
                <img src={data.image} alt="img" className="rounded-lg object-cover w-full h-full cursor-pointer" />
            </div>

            {/* like */}
            <div className="flex items-center gap-2">
                <span onClick={() => handleLike()} className="cursor-pointer text-xl select-none">
                    {!isLike ? <AiOutlineHeart /> : <AiFillHeart color="#850000" />}
                </span>
                <span>{isLike ? convertLike(+data?.like + 1) : convertLike(+data?.like)} like</span>
            </div>
        </div>
    );
};

export default ProfileItem;
