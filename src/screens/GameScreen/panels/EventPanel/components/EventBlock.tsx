import { type CSSProperties, type FC, Fragment, useMemo } from 'react';

import { motion } from 'framer-motion';

import { EventType } from '@/api';
import { FlickeringGrid } from '@/components/shaders/flickering-grid.tsx';
import { Typography } from '@/components/ui/typography.tsx';
import { useDeviceType } from '@/hooks/useDeviceType.ts';
import { useWindowSize } from '@/hooks/useWindowSize.ts';
import { remToPx } from '@/lib/style.ts';
import { cn } from '@/lib/utils.ts';
import { BadEventIcon } from '@/screens/GameScreen/panels/EventPanel/components/BadEventIcon.tsx';
import { GoodEventIcon } from '@/screens/GameScreen/panels/EventPanel/components/GoodEventIcon.tsx';

import SkullLaughImage from '/images/skull-laugh.gif?url';

const WIDTH = 600;
const HEIGHT = 420;

interface EventBlockProps {
    type: EventType;
    text: string;
}

const EventBlock: FC<EventBlockProps> = ({ type, text }) => {
    const { width } = useWindowSize();
    const { isTablet, isMobile } = useDeviceType();

    const { EventIcon, foregroundColor, backgroundColor } = useMemo(() => {
        switch (type) {
            case EventType.GOOD:
                return {
                    EventIcon: GoodEventIcon,
                    foregroundColor: '#14c07f',
                    backgroundColor: 'var(--color-white)',
                };
            case EventType.BAD:
                return {
                    EventIcon: BadEventIcon,
                    foregroundColor: '#F00044',
                    backgroundColor: 'var(--color-white)',
                };
            case EventType.SUPERBAD:
                return {
                    EventIcon: (props: any) => <img alt={''} src={SkullLaughImage} {...props} />,
                    foregroundColor: '#000000',
                    backgroundColor: 'var(--color-white)',
                };
            default:
                return {
                    EventIcon: Fragment,
                };
        }
    }, [type]);

    const paddingPx = remToPx(isTablet ? 6 : isMobile ? 2 : 8);
    const containerWidth = width ? +Number(width - paddingPx * 2).toFixed(0) : WIDTH;

    return (
        <motion.div
            initial={{
                scaleX: 0,
                scaleY: 0,
                opacity: 0,
                filter: 'brightness(2)',
            }}
            animate={{
                scaleX: [0, 0.1, 1, 1],
                scaleY: [0, 0.02, 0.02, 1],
                opacity: [0, 1, 1, 1],
                filter: [
                    'brightness(200%)',
                    'brightness(200%)',
                    'brightness(500%)',
                    'brightness(100%)',
                ],
            }}
            transition={{
                duration: 0.4,
                times: [0, 0.3, 0.7, 1],
                ease: 'easeOut',
                delay: 0.3,
            }}
            className={cn('relative inline-flex')}
        >
            <div
                style={
                    {
                        '--foreground': foregroundColor,
                        '--background': backgroundColor,
                        '--width': `${containerWidth}px`,
                        '--height': `${HEIGHT}px`,
                    } as CSSProperties
                }
                className={'bg-(--foreground)'}
            >
                <FlickeringGrid
                    squareSize={8}
                    gridGap={10}
                    color={'#ffffff'}
                    className={'absolute inset-0'}
                    maxOpacity={0.15}
                    flickerChance={1}
                    height={HEIGHT}
                    width={containerWidth}
                />
                <div className={'flex flex-col w-(--width) h-(--height)'}>
                    <div
                        className={
                            'w-full flex justify-between bg-(--background) px-3 py-3 text-xl uppercase text-(--foreground)'
                        }
                    >
                        <Typography>Внимание!</Typography>
                        <Typography>X</Typography>
                    </div>
                    <div
                        className={
                            'relative flex items-start pt-20 sm:pt-0 sm:items-center flex-1 px-10 after:absolute after:inset-0 after:bg-transparent after:transition-opacity after:border-8 after:border-t-0 after:border-(--background)'
                        }
                    >
                        <div
                            className={
                                'relative flex flex-col sm:flex-row items-center sm:text-start text-center sm:items-start sm:gap-8 gap-12'
                            }
                        >
                            <EventIcon className={'size-18 shrink-0'} color={'var(--foreground)'} />
                            <Typography className={'text-sm sm:text-xl uppercase leading-10'}>
                                {text}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default EventBlock;
