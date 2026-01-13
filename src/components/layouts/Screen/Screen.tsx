import type { FC, PropsWithChildren } from 'react';

const Screen: FC<PropsWithChildren> = ({ children }) => {
    return <div className={'screen overflow-hidden flex flex-col flex-1'}>{children}</div>;
};

export default Screen;
