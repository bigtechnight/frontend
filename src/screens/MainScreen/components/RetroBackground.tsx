import MainThemeBackground from '/images/main-theme-background.png';

import { RetroGrid } from '@/components/shaders/retro-grid.tsx';

const RetroBackground = () => {
    return (
        <div>
            <div>
                <div className={'absolute w-full h-[calc(60dvh_+_30px)]'}>
                    <img
                        className={'object-cover h-full w-full top-auto bottom-0'}
                        src={MainThemeBackground}
                        alt={''}
                    />
                </div>
                <RetroGrid className={'h-[85dvh] -z-1 bottom-0 top-auto'} />
            </div>
        </div>
    );
};

export default RetroBackground;
