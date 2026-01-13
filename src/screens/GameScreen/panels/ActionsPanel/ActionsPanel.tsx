import { type CSSProperties, type FC, useCallback, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';

import type { ActionDto } from '@/api';
import type { GamePanelComponentProps } from '@/screens/GameScreen/types/GamePanelComponentProps.ts';

import { useGameData } from '@/atoms/gameDataAtom.ts';
import { fetchCurrentGameStateAtom, useGameState } from '@/atoms/gameStateAtom.ts';
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

const COUNT_ACTIONS = 4;

const ActionsPanel: FC<Pick<GamePanelComponentProps, 'gameSelect'>> = ({ gameSelect }) => {
    const gameData = useGameData();
    const currentState = useGameState();
    const [, refetchCurrentState] = useAtom(fetchCurrentGameStateAtom);
    const [isPending, setIsPending] = useState(false);

    const currentRound = gameData.rounds.find((round) => round.id === currentState?.currentRoundId);
    const currentActions =
        currentRound?.actions
            .filter((action) => !currentState?.selectedActionIds?.includes(action.id))
            .slice(0, COUNT_ACTIONS) ?? [];

    const [selectedAction, setSelectedAction] = useState<ActionDto | null>(null);

    const handleGameSelectAction = useCallback(async () => {
        refetchCurrentState();
    }, [refetchCurrentState]);

    const handleSelectAction = useCallback(
        async (action: ActionDto) => {
            try {
                setSelectedAction(action);
                setIsPending(true);

                await gameSelect(
                    {
                        actionId: action.id,
                    },
                    true,
                );
            } finally {
                setIsPending(false);
            }
        },
        [gameSelect],
    );

    return (
        <GameLayout.Panel variant={'gradient'}>
            <div className={'space-y-14'}>
                <div className={'text-center space-y-2'}>
                    <Typography variant={'title'}>
                        {selectedAction ? '' : 'Завершите раунд полезным действием'}
                    </Typography>
                </div>
                <div
                    className={
                        'grid grid-cols-1 sm:grid-cols-2 justify-items-center justify-self-center gap-x-10 gap-y-2'
                    }
                >
                    <AnimatePresence>
                        {currentActions.map((item, index) => {
                            const isHidden = Boolean(selectedAction?.id);
                            const isSelected = selectedAction?.id === item.id;

                            return (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 1, y: 50 }}
                                    animate={
                                        isHidden
                                            ? {
                                                  opacity: 0,
                                                  display: 'none',
                                                  scale: isSelected ? 0.5 : 1,
                                                  y: isSelected ? 0 : 50,
                                                  boxShadow: isSelected
                                                      ? '0 0 0 16px rgba(255,255,255,0.5)'
                                                      : 'none',
                                                  transition: {
                                                      duration: isSelected ? 0.3 : 0.5,
                                                      ease: [0.3, 0.8, 0.2, 1],
                                                      delay: isSelected ? 0.3 : 0,
                                                      boxShadow: {
                                                          duration: 0.1,
                                                      },
                                                  },
                                              }
                                            : {
                                                  opacity: 1,
                                                  scale: 1,
                                                  y: 0,
                                                  transition: {
                                                      type: 'spring',
                                                      stiffness: 120,
                                                      damping: 18,
                                                      delay: index * 0.1,
                                                  },
                                              }
                                    }
                                    exit={{ opacity: 0, scale: 1, y: 50 }}
                                    onClick={() => handleSelectAction(item)}
                                    className={'w-[34rem] sm:w-[24rem]'}
                                >
                                    <Card
                                        key={index}
                                        style={
                                            {
                                                '--bg-color': '#0d0d10',
                                            } as CSSProperties
                                        }
                                        className={cn(
                                            'bg-[var(--bg-color)] border-[var(--bg-color)] h-full duration-200',
                                            'active:scale-95',
                                        )}
                                        borderSize={16}
                                    >
                                        <CardHeader className="flex flex-col space-y-0 pb-2">
                                            <CardTitle className="text-2xl font-medium">
                                                {item.name}
                                            </CardTitle>
                                            <CardDescription className="flex gap-4 text-sm text-muted-foreground">
                                                {item.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className={'mt-auto'}>
                                            <div className="text-xl">
                                                {item.cost ? formatPrice(item.cost) : 'Бесплатно'}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
            {selectedAction && (
                <>
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        transition={{
                            delay: 0.5,
                            duration: 0.4,
                            ease: [0.3, 0.8, 0.2, 1],
                        }}
                        className={'absolute top-1/2 left-1/2 -translate-1/2 w-[34rem]'}
                    >
                        <Card
                            style={
                                {
                                    boxShadow: '0 0 0 16px rgba(255,255,255,0.5)',
                                    '--bg-color': '#0d0d10',
                                } as CSSProperties
                            }
                            className={cn(
                                'bg-[var(--bg-color)] border-[var(--bg-color)] px-6 py-10',
                                'data-[state=on]:border-foreground',
                            )}
                            borderSize={16}
                        >
                            <CardHeader className="flex flex-col space-y-0 pb-2">
                                <CardTitle className="text-2xl font-medium">
                                    {selectedAction.name}
                                </CardTitle>
                                <CardDescription className="flex gap-4 text-sm text-muted-foreground">
                                    {selectedAction.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent
                                className={'flex justify-between gap-6 items-center text-xl'}
                            >
                                <div
                                    className={cn(
                                        'flex items-center gap-2',
                                        (selectedAction.profits?.speed ?? 0) > 0
                                            ? 'text-success'
                                            : 'text-destructive',
                                        (selectedAction.profits?.speed ?? 0) === 0 &&
                                            'text-muted-foreground',
                                    )}
                                >
                                    <LightningIcon className={'size-6'} />
                                    <span>
                                        {(selectedAction.profits?.speed ?? 0) > 0 ? '+' : ''}
                                        {selectedAction.profits?.speed}
                                    </span>
                                </div>
                                <div
                                    className={cn(
                                        'flex items-center gap-2',
                                        (selectedAction.profits?.techDebt ?? 0) > 0
                                            ? 'text-destructive'
                                            : 'text-success',
                                        (selectedAction.profits?.techDebt ?? 0) === 0 &&
                                            'text-muted-foreground',
                                    )}
                                >
                                    <MaskIcon className={'size-6'} />
                                    <span>
                                        {(selectedAction.profits?.techDebt ?? 0) > 0 ? '+' : ''}
                                        {selectedAction.profits?.techDebt}
                                    </span>
                                </div>
                                <div
                                    className={cn(
                                        'flex items-center gap-2',
                                        (selectedAction.profits?.cash ?? 0) > 0
                                            ? 'text-success'
                                            : 'text-destructive',
                                        (selectedAction.profits?.cash ?? 0) === 0 &&
                                            'text-muted-foreground',
                                    )}
                                >
                                    <span>
                                        {(selectedAction.profits?.cash ?? 0) > 0 ? '+' : ''}
                                        {formatPrice(selectedAction.profits?.cash ?? 0)}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </>
            )}

            <AnimatePresence>
                {selectedAction && (
                    <GameLayout.FloatingFooter>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, display: 'none' }}
                            animate={{ opacity: 1, scale: 1, display: 'block' }}
                            transition={{ delay: 0.7, duration: 0.2, ease: 'easeInOut' }}
                            className={'w-full'}
                        >
                            <Button
                                className={'w-full'}
                                variant={'accent'}
                                onClick={handleGameSelectAction}
                                disabled={isPending}
                            >
                                {'продолжить'}
                            </Button>
                        </motion.div>
                    </GameLayout.FloatingFooter>
                )}
            </AnimatePresence>
        </GameLayout.Panel>
    );
};

export default ActionsPanel;
