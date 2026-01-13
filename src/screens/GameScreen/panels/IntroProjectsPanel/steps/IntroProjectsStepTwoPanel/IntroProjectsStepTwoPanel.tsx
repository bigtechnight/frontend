import { type FC } from 'react';

import { motion } from 'framer-motion';

import { COMMANDS_LOG } from './constants/commansLogs.ts';
import { CommandType } from './types/CommandType.ts';
import { getSymbolAndColor } from './utilities/getSymbolAndColor.ts';

import type { UseGamePanelSwitcherProps } from '@/screens/GameScreen/hooks/useGamePanelSwitcher.ts';
import type { GamePanelComponentProps } from '@/screens/GameScreen/types/GamePanelComponentProps.ts';

import { GameLayout } from '@/components/layouts';
import { AnimatedSpan, Terminal, TypingAnimation } from '@/components/shaders/terminal.tsx';
import { Button } from '@/components/ui/8bit/button.tsx';
import { Typography } from '@/components/ui/typography.tsx';
import { useScrollBottom } from '@/hooks/useScrollBottom.ts';

const IntroProjectsStepTwoPanel: FC<GamePanelComponentProps & UseGamePanelSwitcherProps> = ({
    next,
}) => {
    const terminalRef = useScrollBottom<HTMLDivElement>({
        smooth: true,
    });

    return (
        <GameLayout.Screen>
            <GameLayout.Panel variant={'gradient'}>
                <div className={'flex flex-col justify-start flex-1 h-full gap-10'}>
                    <Typography
                        variant={'title'}
                        animated
                        duration={30}
                        className={'shrink-0 text-start content-center'}
                    >
                        {
                            'ЗАНИМАТЬСЯ ПРОДУКТОМ. ВКЛАДЫВАТЬСЯ В МАРКЕТИНГ ИЛИ УЛУЧШАТЬ ИНФРАСТРУКТУРУ - РЕШАТЬ ТОЛЬКО ТЕБЕ!'
                        }
                    </Typography>
                    <motion.div
                        initial={{ opacity: 0, y: 20, display: 'none' }}
                        animate={{ opacity: 1, y: 0, display: 'block' }}
                        transition={{
                            delay: 2,
                            duration: 0.5,
                        }}
                        className={'min-h-0'}
                    >
                        <Terminal className={'h-[50vh]'} delay={2} innerRef={terminalRef}>
                            {COMMANDS_LOG.map(({ type, text }, index) => {
                                const { symbol, className } = getSymbolAndColor(type);

                                if (type === CommandType.Install || type === CommandType.Info) {
                                    return (
                                        <AnimatedSpan key={index} className={className}>
                                            {`${symbol} ${text}`}
                                        </AnimatedSpan>
                                    );
                                }

                                if (
                                    type === CommandType.Success ||
                                    type === CommandType.Complete ||
                                    type === CommandType.Init ||
                                    type === CommandType.Build ||
                                    type === CommandType.Setup ||
                                    type === CommandType.Run
                                ) {
                                    return (
                                        <TypingAnimation key={index} className={className}>
                                            {`${symbol} ${text}`}
                                        </TypingAnimation>
                                    );
                                }

                                return (
                                    <TypingAnimation key={index}>
                                        {`${symbol} ${text}`}
                                    </TypingAnimation>
                                );
                            })}
                        </Terminal>
                    </motion.div>
                </div>
                <GameLayout.FloatingFooter>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, display: 'none' }}
                        animate={{ opacity: 1, scale: 1, display: 'initial' }}
                        transition={{ delay: 16, duration: 0.2, ease: 'easeInOut' }}
                        className={'w-full'}
                    >
                        <Button className={'w-full'} onClick={next}>
                            ясно, понятно
                        </Button>
                    </motion.div>
                </GameLayout.FloatingFooter>
            </GameLayout.Panel>
        </GameLayout.Screen>
    );
};

export default IntroProjectsStepTwoPanel;
