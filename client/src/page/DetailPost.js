import React, { useEffect, useMemo, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DefaultImage, ProfileItem } from '../component';
import * as actions from '../store/actions/profile';
import * as action from '../store/actions';
import { apiGetPostUser, apiGetUserProfile } from '../apis/post';
import moment from 'moment';
const DetailPost = () => {
    const params = useParams();
    const [users, setUsers] = useState(null);
    const [posts, setPosts] = useState(null);

    const memoUsers = useMemo(() => {
        return users;
    }, [users]);

    const memoPost = useMemo(() => {
        return posts;
    }, [posts]);

    const dispatch = useDispatch();

    const { idPost, idAuthor } = params;

    const fetchPost = async () => {
        dispatch(action.setLoading(true));
        const res = await apiGetPostUser(idAuthor);
        dispatch(action.setLoading(false));

        if (res?.data?.err === 0) {
            setPosts(res?.data?.data);
        }
    };

    const fetchUser = async () => {
        dispatch(action.setLoading(true));
        const res = await apiGetUserProfile(idAuthor);
        dispatch(action.setLoading(false));

        if (res?.data?.err === 0) {
            setUsers(res?.data?.data);
        }
    };

    useEffect(() => {
        fetchUser();
        fetchPost();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idAuthor, dispatch]);

    useEffect(() => {
        dispatch(actions.getPostProfile());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idPost, idAuthor]);

    useEffect(() => {
        dispatch(action.setPageName({ pageName: 'Profile', pageId: 5 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex w-full h-full gap-[28px]">
            <Scrollbars
                style={{
                    width: '100%',
                    height: '100%',
                    marginBottom: '-17px',
                }}
                autoHide
                className="w-[60%] rounded-lg overflow-y-auto"
            >
                {memoPost ? (
                    <div className="flex flex-col gap-[28px] items-center overflow-y-auto">
                        {memoPost &&
                            memoPost?.map((item) => {
                                return (
                                    <ProfileItem
                                        key={item._id}
                                        data={{ ...item, avartar: memoUsers?.image, username: memoUsers?.username }}
                                    />
                                );
                            })}
                    </div>
                ) : (
                    ''
                )}
            </Scrollbars>
            {memoUsers ? (
                <div className="bg-gray-100 w-[40%] rounded-lg shadow-lg p-5 flex flex-col gap-2">
                    <div
                        onClick={(e) => {
                            dispatch(actions.setImgPopup(memoUsers?.image));
                        }}
                        className="w-full flex items-center justify-center cursor-pointer"
                    >
                        {memoUsers.image ? (
                            <img
                                src={memoUsers?.image}
                                alt="avartar"
                                className="h-[150px] w-[150px] rounded-xl object-cover"
                            />
                        ) : (
                            <span className="h-[150px] w-[150px] rounded-xl object-cover border border-gray-400">
                                <DefaultImage />
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1 text-gray-400">
                        <h4 className="font-bold text-xl text-black">{memoUsers?.username}</h4>
                        <span>Email: {memoUsers?.email}</span>
                        <span>Participation: {moment(memoUsers?.createdAt).fromNow()}</span>
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default DetailPost;
