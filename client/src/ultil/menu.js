import { RiHomeLine } from 'react-icons/ri';
import { CgMenuBoxed } from 'react-icons/cg';
import { FiBell } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';

export const menu = [
    {
        id: 1,
        title: 'Home',
        icon: <RiHomeLine />,
        link: '/',
    },
    {
        id: 2,
        title: 'Create New Post',
        icon: <AiOutlinePlus />,
        link: '/new-post',
    },
    {
        id: 3,
        title: 'Your Profile',
        icon: <CgMenuBoxed />,
        link: '/me',
    },
    {
        id: 4,
        title: 'Notitycation',
        icon: <FiBell />,
        link: '/notify',
    },
];
