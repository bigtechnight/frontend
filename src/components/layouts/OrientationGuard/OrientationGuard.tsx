import { type FC, type PropsWithChildren, useEffect, useState } from 'react';

import { TabletSmartphone } from 'lucide-react';

const OrientationGuard: FC<PropsWithChildren> = ({ children }) => {
    const [isPortrait, setIsPortrait] = useState(true);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(orientation: portrait)');

        const handleChange = (e: MediaQueryListEvent) => setIsPortrait(e.matches);

        setIsPortrait(mediaQuery.matches);

        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    if (!isPortrait) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-background text-foreground text-xl text-center p-4">
                <div className={'flex flex-col gap-4 items-center justify-center'}>
                    <TabletSmartphone className={'w-30 h-20'} />
                    <div>Пожалуйста, переверните устройство в вертикальное положение</div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default OrientationGuard;
