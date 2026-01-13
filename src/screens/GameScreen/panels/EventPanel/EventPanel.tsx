import { type FC } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { type GameEventDto } from '@/api';
import { LightningIcon } from '@/components/icons/lightning.tsx';
import { MaskIcon } from '@/components/icons/mask.tsx';
import { GameLayout } from '@/components/layouts';
import { Button } from '@/components/ui/8bit/button.tsx';
import { Typography } from '@/components/ui/typography.tsx';
import { CHAR_NARROW_SPACE, CHAR_PERCENT } from '@/constants/charCodes.ts';
import { formatPrice } from '@/lib/format.ts';
import EventBlock from '@/screens/GameScreen/panels/EventPanel/components/EventBlock.tsx';

interface EventPanelProps {
    event: GameEventDto;
    onClearEvent: () => void;
}

const EventPanel: FC<EventPanelProps> = ({ event, onClearEvent }) => {
    const { profits } = event;

    return (
        <GameLayout.Panel data-event-id={event.id} variant={'gradient'}>
            <div className={'text-center space-y-2 mb-30'}>
                <Typography variant={'title'} animated delay={0.2}>
                    {'Случайное событие'}
                </Typography>
            </div>
            <div className={'flex flex-col items-center justify-center'}>
                <EventBlock type={event.type} text={event.description} />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.2, ease: 'easeInOut' }}
                    className={'w-full mt-10'}
                >
                    <div className={'flex flex-wrap justify-center items-center mx-auto gap-14'}>
                        <div className="flex gap-3 text-3xl items-center">
                            <MaskIcon className={'text-destructive'} />
                            <span>{`${profits?.techDebt}${CHAR_NARROW_SPACE}${CHAR_PERCENT}`}</span>
                        </div>
                        <div className="flex gap-3 text-3xl items-center">
                            <LightningIcon className={'text-warning'} />
                            <span>{profits?.speed}</span>
                        </div>
                        <div className="flex gap-3 text-3xl items-center">
                            <span>{formatPrice(profits?.cash ?? 0)}</span>
                        </div>
                    </div>
                </motion.div>
            </div>
            <GameLayout.FloatingFooter>
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, display: 'none' }}
                        animate={{ opacity: 1, scale: 1, display: 'block' }}
                        transition={{ delay: 0.7, duration: 0.2, ease: 'easeInOut' }}
                        className={'w-full'}
                    >
                        <Button className={'w-full'} variant={'accent'} onClick={onClearEvent}>
                            окак
                        </Button>
                    </motion.div>
                </AnimatePresence>
            </GameLayout.FloatingFooter>
        </GameLayout.Panel>
    );
};

export default EventPanel;
