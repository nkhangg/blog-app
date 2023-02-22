import React, { memo } from 'react';

const Input = ({ err, title, type = 'text', setData = () => {}, data = null }) => {
    return (
        <div className="flex flex-col gap-4">
            <label htmlFor="address" className="font-bold text-xl px-4">
                {title}
            </label>
            <div className="flex flex-col">
                <input
                    value={data ? data : ''}
                    onChange={(e) => setData(e.target.value)}
                    placeholder={`${title}...`}
                    type={`${type}`}
                    id={`${title}`}
                    className="border-2 border-gray-400 h-[40px] rounded-lg shadow-lg p-4 text-[16px]"
                />
                <span className="text-xs text-red-800 p-4 h-[12px]">{data === '' ? err : ''}</span>
            </div>
        </div>
    );
};

export default memo(Input);
