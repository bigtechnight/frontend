import { type FC, useMemo } from 'react';

import { motion } from 'framer-motion';

import type { UseGamePanelSwitcherProps } from '@/screens/GameScreen/hooks/useGamePanelSwitcher.ts';
import type { GamePanelComponentProps } from '@/screens/GameScreen/types/GamePanelComponentProps.ts';

import { useGameData } from '@/atoms/gameDataAtom.ts';
import { LightningIcon } from '@/components/icons/lightning.tsx';
import { GameLayout } from '@/components/layouts';
import { Button } from '@/components/ui/8bit/button.tsx';
import { Card } from '@/components/ui/8bit/card.tsx';
import { Typography } from '@/components/ui/typography.tsx';
import { getUnitNamesByIds } from '@/lib/gameUtils.ts';

const IntroProjectsStepOnePanel: FC<GamePanelComponentProps & UseGamePanelSwitcherProps> = ({
    selectResult,
    next,
}) => {
    const gameData = useGameData();

    const selectedUnits = useMemo(
        () => getUnitNamesByIds(gameData, selectResult.allChoices.units),
        [gameData, selectResult.allChoices.units],
    );

    return (
        <GameLayout.Panel variant={'gradient'}>
            <Typography variant={'title'} className={'text-center mb-20'}>
                Вот что вы выбрали
            </Typography>
            <div className={'flex gap-x-10 gap-y-6 justify-center flex-wrap'}>
                {selectedUnits.map((unit, index) => (
                    <motion.div
                        key={unit.id}
                        initial={{ opacity: 0, scale: 0.3, y: 200 }}
                        animate={{
                            x: [0, -10, 30, -20, 20, 0],
                            y: 0,
                            textShadow: [
                                '0px 0px 0px #0ff',
                                '30px 0px 30px #f0f',
                                '-30px 0px 30px #0ff',
                                '0px 0px 0px #f0f',
                            ],
                            boxShadow: [
                                '0px 0px 0px #0ff',
                                '10px 0px 30px #f0f',
                                '-10px 0px 30px #0ff',
                                '0px 0px 0px #f0f',
                            ],
                            scale: 1,
                            opacity: 1,
                        }}
                        transition={{
                            opacity: { delay: index * 0.2 },
                            x: { delay: index * 0.2, duration: 0.3 },
                            y: {
                                delay: index * 0.2,
                                duration: 0.3,
                                type: 'spring',
                                stiffness: 120,
                                damping: 18,
                                mass: 0.6,
                            },
                            textShadow: { delay: 0.2 + index * 0.2, duration: 0.3 },
                            boxShadow: { delay: 0.2 + index * 0.2, duration: 0.3 },
                            ease: 'easeOut',
                        }}
                        className={'w-[14rem] h-[20rem]'}
                    >
                        <Card
                            className={
                                'border-[#5528AB] bg-[#2F234F] items-center px-8 pt-14 h-full'
                            }
                        >
                            <LightningIcon className={'text-warning size-16'} />
                            <Typography
                                className={'text-center text-secondary/70'}
                            >{`${unit.quizName}`}</Typography>
                            <Typography
                                className={
                                    'text-xl text-center text-[#FFE4C0] break-words line-clamp-2 w-full'
                                }
                            >
                                {unit.name}
                            </Typography>
                        </Card>
                    </motion.div>
                ))}
            </div>
            <GameLayout.FloatingFooter>
                <Button className={'w-full'} onClick={next}>
                    идем дальше
                </Button>
            </GameLayout.FloatingFooter>
        </GameLayout.Panel>
    );
};

export default IntroProjectsStepOnePanel;
