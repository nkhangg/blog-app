import { useSelector } from 'react-redux';
import { NavBar } from './page';

import HomePage from './page/HomePage';

function App() {
    const { loginMode, registerMode } = useSelector((state) => state.app);
    return (
        <div className="relative bg-gradient-to-r from-[#6342c347] to-[#ff369347] overflow-hidden w-full h-screen ">
            <div
                className={`h-[90vh] flex ${
                    loginMode || registerMode ? 'justify-center' : 'justify-between'
                } w-[90vw] bg-gray-100 absolute rounded-3xl shadow-2xl top-[50%] left-[50%] 
            translate-x-[-50%] translate-y-[-50%] overflow-hidden`}
            >
                <NavBar hide={loginMode || registerMode} />

                <HomePage />
            </div>
        </div>
    );
}

export default App;
