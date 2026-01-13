import { useLayoutEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router';

import { DIALOG } from './constants/dialog.ts';

import { GameApiRequest, setToken } from '@/api/request';
import { useGameData } from '@/atoms/gameDataAtom';
import { userNameAtom } from '@/atoms/userAtom.ts';
import { StartRoundNotification } from '@/components/common/StartRoundNotification.tsx';
import { GameLayout } from '@/components/layouts';
import { Button } from '@/components/ui/8bit/button.tsx';
import { Card, CardContent } from '@/components/ui/8bit/card.tsx';
import { useScrollBottom } from '@/hooks/useScrollBottom.ts';
import { delayTransition } from '@/lib/delayTransition.ts';
import { cn } from '@/lib/utils.ts';
import { GameScreenRoute, MainScreenRoute } from '@/screens';

const delay = delayTransition(1, 0.5);

const OnboardingScreen = () => {
    const [name] = useAtom(userNameAtom);
    const gameData = useGameData();
    const navigate = useNavigate();

    const webAppName = gameData.rounds[0].name;

    const [disabled, setDisabled] = useState(false);

    useLayoutEffect(() => {
        if (!name) {
            navigate(MainScreenRoute.path);
        }
    }, [name, navigate]);

    const [messages, setMessages] = useState<
        {
            text: string;
            side: 'user' | 'bot';
        }[]
    >([]);
    const [step, setStep] = useState(0);

    useScrollBottom<HTMLDivElement>({ smooth: true, useWindow: true });

    const handleNext = () => {
        if (step >= DIALOG.length) return;

        const next = DIALOG[step];
        setMessages((prev) => [
            ...prev,
            { text: next.user, side: 'user' },
            { text: next.bot, side: 'bot' },
        ]);

        setStep(step + 1);
    };

    const gameStart = async () => {
        setDisabled(true);
        const {
            data: { token },
        } = await GameApiRequest.gameStart({
            startGameDto: {
                name: name,
            },
        });
        setToken(token);
        navigate(GameScreenRoute.path);
    };

    return (
        <GameLayout.Screen>
            <GameLayout.Header />
            <GameLayout.Panel variant={'gradient'}>
                <StartRoundNotification userName={name} delay={delay} webAppName={webAppName} />

                {messages.length > 0 && (
                    <div className="flex flex-col p-4 space-y-3 mt-10">
                        <div className="flex flex-col space-y-2">
                            {messages.map((msg, i) => {
                                const isUser = msg.side === 'user';

                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 100,
                                            damping: 15,
                                            delay: isUser ? 0 : 0.5,
                                        }}
                                        className={`p-3 rounded-md max-w-[90%] sm:max-w-[70%] whitespace-pre-wrap ${
                                            isUser ? 'self-end' : 'self-start'
                                        }`}
                                    >
                                        <Card
                                            className={cn(
                                                'bg-transparent',
                                                isUser ? 'border-primary' : 'border-border',
                                            )}
                                        >
                                            <CardContent className={'uppercase'}>
                                                {msg.text}
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                )}
                <GameLayout.FloatingFooter>
                    <motion.div
                        initial={{ opacity: 0, y: 0, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: delay(3), duration: 0.2, ease: 'easeInOut' }}
                        className={'w-full'}
                    >
                        {DIALOG[step]?.button ? (
                            <Button variant={'accent'} className={'w-full'} onClick={handleNext}>
                                {DIALOG[step].button}
                            </Button>
                        ) : (
                            <Button
                                variant={'primary'}
                                className={'w-full'}
                                onClick={gameStart}
                                disabled={disabled}
                            >
                                начать игру
                            </Button>
                        )}
                    </motion.div>
                </GameLayout.FloatingFooter>
            </GameLayout.Panel>
        </GameLayout.Screen>
    );
};

export default OnboardingScreen;
