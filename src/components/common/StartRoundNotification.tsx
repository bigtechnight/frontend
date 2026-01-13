import type { FC } from 'react';

import { MainGooseImg } from './MainGooseImg.tsx';

import { Typography } from '@/components/ui/typography.tsx';

interface IStartRoundNotification {
    userName: string;
    webAppName: string;
    delay: (count: number) => number;
}

export const StartRoundNotification: FC<IStartRoundNotification> = ({
    userName,
    webAppName,
    delay,
}) => {
    return (
        <>
            <div className={'text-center space-y-2 mb-10'}>
                <Typography variant={'subtitle'} animated delay={delay(0)}>
                    {`${userName}, тебе прилетела новая задача`}
                </Typography>
                <Typography variant={'title'} animated delay={delay(1)}>
                    разработай
                </Typography>
            </div>
            <MainGooseImg />

            <Typography variant={'title'} className={'text-center'} animated delay={delay(2)}>
                {`GAGA, ${webAppName}`}
            </Typography>
        </>
    );
};
