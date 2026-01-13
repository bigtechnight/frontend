import { type FC, type PropsWithChildren } from 'react';

const FloatingFooter: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="px-10 pb-12 pt-14 mt-auto fixed bg-gradient-to-t from-background/80 to-transparent transition-colors duration-500 bottom-0 left-0 w-full flex justify-center items-center z-50">
            {children}
        </div>
    );
};

export default FloatingFooter;
