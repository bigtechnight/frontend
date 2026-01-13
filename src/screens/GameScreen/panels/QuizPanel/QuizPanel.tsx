import { type CSSProperties, type FC, useEffect, useMemo, useState } from 'react';

import * as TogglePrimitive from '@radix-ui/react-toggle';
import { motion } from 'framer-motion';

import type { UnitDto } from '@/api';
import type { GamePanelComponentProps } from '@/screens/GameScreen/types/GamePanelComponentProps.ts';

import { useGameData } from '@/atoms/gameDataAtom.ts';
import { useGameState } from '@/atoms/gameStateAtom.ts';
import { LightningIcon } from '@/components/icons/lightning.tsx';
import { MaskIcon } from '@/components/icons/mask.tsx';
import { GameLayout } from '@/components/layouts';
import { Button } from '@/components/ui/8bit/button.tsx';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/8bit/card.tsx';
import { Typography } from '@/components/ui/typography.tsx';
import { formatPrice } from '@/lib/format.ts';
import { cn } from '@/lib/utils.ts';
import { StepIndicator } from '@/screens/GameScreen/components/StepIndicator/StepIndicator.tsx';

const getThemeMap = (theme: string) =>
    ({
        red: '#3F2E3C',
        orange: '#42322c',
        yellow: '#4b3e28',
        blue: '#2E373F',
        green: '#2E3C3F',
    })[theme] ?? 'black';

const QuizPanel: FC<Pick<GamePanelComponentProps, 'gameSelect'>> = ({ gameSelect }) => {
    const gameData = useGameData();
    const currentState = useGameState();

    const { currentQuiz, currentQuizIndex, currentRound } = useMemo(() => {
        const currentRound = gameData.rounds.find(
            (round) => round.id === currentState.currentRoundId,
        );
        const currentQuizIndex = currentRound?.quiz.findIndex(
            (quiz) => quiz.id === currentState.quizId,
        );
        const currentQuiz =
            typeof currentQuizIndex !== 'undefined'
                ? currentRound?.quiz[currentQuizIndex]
                : undefined;

        return {
            currentRound,
            currentQuiz,
            currentQuizIndex,
        };
    }, [currentState, gameData.rounds]);

    const [selectedStack, setSelectedStack] = useState<UnitDto | null>(null);

    const handleSelectStack = async () => {
        if (!selectedStack) return;

        await gameSelect({
            unitId: selectedStack.id,
        });

        setSelectedStack(null);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentQuizIndex]);

    return (
        <GameLayout.Panel variant={'gradient'}>
            <div className={'space-y-14'}>
                <div className={'text-center space-y-2'}>
                    <StepIndicator
                        current={(currentQuizIndex ?? 0) + 1}
                        stepFormat={(step) => step.toString()}
                        total={currentRound?.quiz.length ?? 0}
                    />
                    <Typography variant={'title'}>{`${currentQuiz?.name}`}</Typography>
                    <Typography variant={'subtitle'}>{''}</Typography>
                </div>
                <div className={'grid grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] gap-6'}>
                    {currentQuiz?.units.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: index * 0.1,
                                type: 'spring',
                                stiffness: 120,
                                damping: 18,
                            }}
                        >
                            <TogglePrimitive.Root
                                key={item.id}
                                asChild
                                pressed={selectedStack?.id === item.id}
                                onPressedChange={() => setSelectedStack(item)}
                            >
                                <Card
                                    key={index}
                                    style={
                                        {
                                            '--bg-color': getThemeMap(currentQuiz.theme),
                                        } as CSSProperties
                                    }
                                    className={cn(
                                        'bg-[var(--bg-color)] border-[var(--bg-color)]',
                                        'data-[state=on]:border-foreground h-full',
                                    )}
                                >
                                    <CardHeader className="flex flex-col space-y-2 pb-2 h-full">
                                        <CardTitle className="sm:text-2xl text-xl font-medium">
                                            {item.name}
                                        </CardTitle>
                                        <CardDescription>{item.description}</CardDescription>
                                        <CardDescription className="flex gap-6 text-lg text-muted-foreground">
                                            <div className={'flex gap-2'}>
                                                <LightningIcon className={'size-6'} />
                                                <span>
                                                    {item.profits.speed > 0
                                                        ? `+${item.profits.speed}`
                                                        : `${item.profits.speed}`}
                                                </span>
                                            </div>
                                            <div className={'flex gap-2'}>
                                                <MaskIcon className={'size-6'} />
                                                <span>
                                                    {item.profits.techDebt > 0
                                                        ? `+${item.profits.techDebt}`
                                                        : `${item.profits.techDebt}`}
                                                </span>
                                            </div>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className={'mt-auto'}>
                                        <div className="text-xl">{formatPrice(item.cost)}</div>
                                    </CardContent>
                                </Card>
                            </TogglePrimitive.Root>
                        </motion.div>
                    ))}
                </div>
            </div>
            {selectedStack && (
                <GameLayout.FloatingFooter>
                    <Button className={'w-full'} variant={'accent'} onClick={handleSelectStack}>
                        НОРМ
                    </Button>
                </GameLayout.FloatingFooter>
            )}
        </GameLayout.Panel>
    );
};

export default QuizPanel;
