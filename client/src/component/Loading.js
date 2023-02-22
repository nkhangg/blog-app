import React from 'react';
import { useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';

const Loading = () => {
    const { isLoading } = useSelector((state) => state.profile);

    return (
        <>
            {isLoading ? (
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center">
                    <PropagateLoader color="#36d7b7" />
                </div>
            ) : (
                ''
            )}
        </>
    );
};

export default Loading;
