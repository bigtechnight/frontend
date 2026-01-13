import { type FC, useCallback, useLayoutEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router';

import type { GameResultDto } from '@/api';

import { GameApiRequest, hasToken, removeToken, withToken } from '@/api/request';
import { removeUserName, userNameAtom } from '@/atoms/userAtom.ts';
import { CubokIcon } from '@/components/icons/cubok.tsx';
import { LightningIcon } from '@/components/icons/lightning.tsx';
import { MaskIcon } from '@/components/icons/mask.tsx';
import { GameLayout } from '@/components/layouts';
import { Button } from '@/components/ui/8bit/button.tsx';
import { Typography } from '@/components/ui/typography';
import { useDeviceType } from '@/hooks/useDeviceType.ts';
import { MainScreenRoute } from '@/screens';
import { CashScore } from '@/screens/GameScreen/panels/GameResultPanel/components/CashScore';
import { GooseAvatar } from '@/screens/GameScreen/panels/GameResultPanel/components/GooseAvatar';
import { ScoreCard } from '@/screens/GameScreen/panels/GameResultPanel/components/ScoreCard';

import FinalResultBackgroundImage from '/images/final-result-bg.png';

const GameResultPanel: FC = () => {
    const navigate = useNavigate();
    const { isMobile } = useDeviceType();
    const [, setName] = useAtom(userNameAtom);
    const [result, setResult] = useState<GameResultDto | null>(null);

    const fetchResult = useCallback(async () => {
        const { data } = await GameApiRequest.gameResult(withToken());
        setResult(data);
    }, []);

    const goToMainMenu = useCallback(() => {
        removeToken();
        removeUserName();
        setName('');
        navigate(MainScreenRoute.path);
    }, [navigate, setName]);

    useLayoutEffect(() => {
        if (hasToken()) {
            fetchResult();
        } else {
            goToMainMenu();
        }
    }, [fetchResult, goToMainMenu]);

    return (
        <GameLayout.Screen>
            <GameLayout.Panel space={'none'}>
                <img
                    src={FinalResultBackgroundImage}
                    alt={''}
                    className={'fixed inset-0 w-full h-full'}
                />
                <div className={'relative w-full h-full sm:pt-30 pt-16'}>
                    <div className={'ml-10 gap-10 flex flex-1 justify-start'}>
                        <GooseAvatar />
                        <div className={'text-left space-y-6 mt-4'}>
                            <Typography variant={'subtitle'} animated delay={0.2}>
                                результат
                            </Typography>
                            <Typography variant={'title'} animated delay={0.2}>
                                {result?.userName || ''}
                            </Typography>
                        </div>
                    </div>

                    <CashScore cash={result?.cash ?? 0} variant={'cashCard'} />

                    <div className={'flex justify-between gap-6 sm:gap-2'}>
                        <ScoreCard
                            variant={'cashCard'}
                            icon={<MaskIcon className={'text-destructive w-14 h-14'} />}
                            title="техдолг"
                            score={`${result?.techDebt ?? 0}%`}
                        />
                        <ScoreCard
                            variant={'cashCard'}
                            icon={<LightningIcon className={'text-warning w-14 h-14'} />}
                            title="скорость"
                            score={`${result?.developingSpeed ?? 0}`}
                        />
                        {!isMobile && (
                            <ScoreCard
                                variant={'cashCard'}
                                icon={<CubokIcon className={'text-warning w-14 h-14'} />}
                                title="место"
                                score={`${result?.userPlace ?? 0}`}
                            />
                        )}
                    </div>
                    {isMobile && (
                        <ScoreCard
                            variant={'cashCard'}
                            icon={<CubokIcon className={'text-warning w-14 h-14'} />}
                            title="место"
                            score={`${result?.userPlace ?? 0}`}
                        />
                    )}
                    <div className={'mt-10 pb-20 text-center'}>
                        <Typography className={'mb-2'}>Сфоткайте и поделитесь</Typography>
                        <Typography className={'mb-10'}>в соцсетях</Typography>
                        <motion.div
                            initial={{ opacity: 0, y: 0, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                            className={'w-full'}
                        >
                            <Button variant={'accent'} className={'w-full'} onClick={goToMainMenu}>
                                В меню
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </GameLayout.Panel>
        </GameLayout.Screen>
    );
};
export default GameResultPanel;
