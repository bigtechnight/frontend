import type { FC, ReactNode } from 'react';

import { FinalResultCard } from './FinalResultCard.tsx';

import { Typography } from '@/components/ui/typography.tsx';
import { delayTransition } from '@/lib/delayTransition.ts';

const delay = delayTransition(0.1, 0.5);

export const ScoreCard: FC<{
    icon: ReactNode;
    title: string;
    score: string;
    variant?: FinalResultCard['variant'];
}> = ({ icon, title, score, variant }) => {
    return (
        <FinalResultCard variant={variant}>
            {icon}
            <div className={'w-full text-center'}>
                <Typography variant={'subtitle'} className={'mb-6'}>
                    {title}
                </Typography>
                <Typography variant={'title'} animated delay={delay(0.4)}>
                    {score}
                </Typography>
            </div>
        </FinalResultCard>
    );
};

export default ScoreCard;
