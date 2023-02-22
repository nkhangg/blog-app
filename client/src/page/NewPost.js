import React, { useEffect, useState } from 'react';
import { Input, PostItem } from '../component';
import { motion } from 'framer-motion';
import { apiPost } from '../apis/post';
import { useNavigate } from 'react-router-dom';
import { path } from '../ultil/path';
import * as actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { initPageName } from '../ultil/app';
import { toast } from 'react-toastify';

const NewPost = () => {
    const { isLogin, token, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [title, setTitle] = useState(null);
    const [linkImage, setLinkImage] = useState(null);

    const fetchPost = async (data, token) => {
        if (!isLogin || !token) {
            navigate(path.login);
            return;
        }

        dispatch(actions.setLoading(true));
        const res = await apiPost(data, token);
        dispatch(actions.setLoading(false));

        if (res?.data?.err === 0) {
            navigate(path.home);
            dispatch(actions.setPageName({ pageName: 'Home', pageId: 1 }));
            toast.success(res?.data?.mess);
        } else {
            toast.error(res?.data?.mess);
        }
    };

    const handleSubmit = () => {
        if (!title || !linkImage) {
            toast.warn('Lack of information');
            return;
        }

        if (!title === '' || !linkImage === '') {
            toast.warn('Lack of information');
            return;
        }
        fetchPost({ title, image: linkImage, authorName: user?.username, authorId: user?._id }, token);
    };

    useEffect(() => {
        initPageName(dispatch, 2);
    }, [dispatch]);
    return (
        <div className="grid grid-cols-2 gap-[28px] h-full relative">
            <div className="flex flex-col">
                <Input title={'Title For New Post'} err="Title Can't empty !" data={title} setData={setTitle} />
                <Input title={'Link Your Image'} err="Link Can't empty !" data={linkImage} setData={setLinkImage} />
            </div>
            <PostItem isHideHeart data={{ title, image: linkImage }} />

            <motion.button
                onClick={(e) => handleSubmit(e)}
                whileTap={{
                    scale: 0.8,
                }}
                className="absolute bottom-5 right-10 p-1 border-2 border-gray-400 w-[10%] rounded-lg shadow-md font-bold text-lg"
            >
                Submit
            </motion.button>
        </div>
    );
};

export default NewPost;
