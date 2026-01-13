import { type FC, useEffect, useState } from 'react';

import { LightningIcon } from '@/components/icons/lightning.tsx';
import { MaskIcon } from '@/components/icons/mask.tsx';
import { Ticker } from '@/components/shaders/ticker.tsx';
import { CHAR_NARROW_SPACE, CHAR_PERCENT } from '@/constants/charCodes.ts';
import i18n from '@/i18n';
import { formatPrice } from '@/lib/format.ts';
import { cn } from '@/lib/utils.ts';

interface HUDProps {
    techDept: number;
    speed: number;
    balance: number;
}

const HUD: FC<HUDProps> = ({ techDept, balance, speed }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY >= 50);
        };

        window.addEventListener('scroll', onScroll);
        onScroll();

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={cn(
                'h-[var(--header-height)] fixed w-full top-0 z-40 transition-colors duration-500',
                {
                    'bg-gradient-to-b from-background/80 to-transparent': scrolled,
                },
            )}
        >
            <div className="mx-auto w-full pt-8 px-8 flex justify-between gap-3">
                <div className={'flex gap-10'}>
                    <div className={'space-y-2'}>
                        <div className={'text-muted-foreground text-sm'}>{i18n.t('techDebt')}</div>
                        <div className="flex gap-3 text-xl items-center">
                            <MaskIcon className={'text-destructive'} />
                            <Ticker value={`${techDept}${CHAR_NARROW_SPACE}${CHAR_PERCENT}`} />
                        </div>
                    </div>
                    <div className={'space-y-2'}>
                        <div className={'text-muted-foreground text-sm'}>{i18n.t('speed')}</div>
                        <div className="flex gap-3 text-xl items-center">
                            <LightningIcon className={'text-warning'} />
                            <Ticker value={String(speed)} />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className={'space-y-2 text-right'}>
                        <div className={'text-muted-foreground text-sm'}>{i18n.t('money')}</div>
                        <Ticker className={'text-xl'} value={formatPrice(balance)} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HUD;
