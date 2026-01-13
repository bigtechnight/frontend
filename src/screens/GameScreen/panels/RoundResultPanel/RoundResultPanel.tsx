import { memo, type FC } from 'react';

import { motion } from 'framer-motion';

import { CashScore } from '../GameResultPanel/components/CashScore';
import ScoreCard from '../GameResultPanel/components/ScoreCard';

import type { CurrentBalanceDto, CurrentRoundStatsDto, SelectResultDto } from '@/api';

import { LightningIcon } from '@/components/icons/lightning';
import { MaskIcon } from '@/components/icons/mask';
import { GameLayout } from '@/components/layouts';
import { Button } from '@/components/ui/8bit/button.tsx';
import { Typography } from '@/components/ui/typography';

interface IRoundResultPanelProps {
    selectResult: SelectResultDto;
    onClose: () => void;
}

const accSelectResult =
    (selectResult: SelectResultDto) =>
    (cbKey: keyof CurrentBalanceDto, crKey: keyof CurrentRoundStatsDto) =>
        selectResult.currentBalance[cbKey] - (selectResult.currentRound[crKey] ?? 0);

const RoundResultPanel: FC<IRoundResultPanelProps> = ({ selectResult, onClose }) => {
    const toResult = accSelectResult(selectResult);

    return (
        <GameLayout.Panel variant={'gradient'} mode={'beams'}>
            <div className={'text-center space-y-2 mb-30'}>
                <Typography variant={'title'} animated delay={0.2}>
                    {'результат за раунд'}
                </Typography>
            </div>
            <div className={'sm:w-[calc(100%-10rem)] sm:mx-auto'}>
                <CashScore
                    cash={toResult('cash', 'start_cash')}
                    variant={'scoreCard'}
                    title="вы заработали"
                />

                <div className={'flex justify-between gap-8'}>
                    <ScoreCard
                        icon={<LightningIcon className={'text-warning w-14 h-14'} />}
                        title="скорость"
                        score={`${toResult('developingSpeed', 'start_developingSpeed')}`}
                    />
                    <ScoreCard
                        icon={<MaskIcon className={'text-destructive w-14 h-14'} />}
                        title="техдолг"
                        score={`${toResult('techDebt', 'start_techDebt')}%`}
                    />
                </div>
            </div>

            <GameLayout.FloatingFooter>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.2, ease: 'easeInOut' }}
                    className={'w-full'}
                >
                    <Button className={'w-full'} variant={'primary'} onClick={onClose}>
                        К результату
                    </Button>
                </motion.div>
            </GameLayout.FloatingFooter>
        </GameLayout.Panel>
    );
};

export default memo(RoundResultPanel);
