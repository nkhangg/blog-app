import Tippy from '@tippyjs/react/headless';

const WraperTippy = ({ render, children, isHide, setIsHide, placement = 'left' }) => {
    return (
        <div>
            <Tippy
                onClickOutside={() => setIsHide(false)}
                placement={placement}
                interactive={true}
                visible={isHide}
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                        {render}
                    </div>
                )}
            >
                {children}
            </Tippy>
        </div>
    );
};

export default WraperTippy;
