import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiGetPost, apiUpdatePost } from '../apis/post';
import { Input, PostItem, WraperPopup } from '../component';
import { motion } from 'framer-motion';
import { path } from '../ultil/path';
import * as actions from '../store/actions';
import { toast } from 'react-toastify';

const Update = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { idUpdate } = useSelector((state) => state.app);
    const { isLogin, user, token } = useSelector((state) => state.auth);
    const [title, setTitle] = useState(null);
    const [linkImage, setLinkImage] = useState(null);

    const fetchGetDataUpdate = async () => {
        dispatch(actions.setLoading(true));
        const res = await apiGetPost(idUpdate);
        dispatch(actions.setLoading(false));
        if (res?.data?.err === 0) {
            setTitle(res?.data?.data?.title);
            setLinkImage(res?.data?.data?.image);
        }
    };

    useEffect(() => {
        fetchGetDataUpdate();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idUpdate]);

    useEffect(() => {
        dispatch(actions.setPageName({ pageName: 'Edit Your Post', pageId: 7 }));
    }, [dispatch]);

    const fetchUpdate = async () => {
        dispatch(actions.setLoading(true));

        const res = await apiUpdatePost(
            { title, image: linkImage, authorName: user?.username, authorId: user?._id, idPost: idUpdate },
            token,
        );
        dispatch(actions.setLoading(false));

        if (res?.data?.err === 0) {
            toast.success(res?.data?.mess);
            navigate(path.home);
        } else {
            toast.error(res?.data?.mess);
        }
    };

    const handleSubmit = () => {
        if (!isLogin || !token) {
            navigate(path.login);
            return;
        }

        if (!title || !linkImage) {
            toast.warn('Lack of information');
            return;
        }

        if (!title === '' || !linkImage === '') {
            toast.warn('Lack of information');
            return;
        }

        fetchUpdate();
    };

    return (
        <>
            {idUpdate ? (
                <div className="grid grid-cols-2 gap-[28px] h-full relative">
                    <div className="flex flex-col gap-[28px]">
                        <Input title={'Title For New Post'} err="Title Can't empty !" data={title} setData={setTitle} />
                        <Input
                            title={'Link Your Image'}
                            err="Link Can't empty !"
                            data={linkImage}
                            setData={setLinkImage}
                        />
                    </div>
                    <PostItem data={{ title, image: linkImage }} />

                    <motion.button
                        onClick={(e) => handleSubmit(e)}
                        whileTap={{
                            scale: 0.8,
                        }}
                        className="absolute bottom-5 right-10 p-1 border-2 border-gray-400 w-[10%] rounded-lg shadow-md font-bold text-lg"
                    >
                        Update
                    </motion.button>
                </div>
            ) : (
                <WraperPopup isHide={true}>
                    <div className="bg-white p-5 rounded-lg">
                        <h1 className="text-2xl font-bold">Please select post to edit !</h1>
                    </div>
                </WraperPopup>
            )}
        </>
    );
};

export default Update;
