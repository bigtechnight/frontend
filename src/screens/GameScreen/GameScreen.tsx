import { useCallback, useEffect, useRef, useState } from 'react';

import { withInitDataMiddleware } from './middlewares/withInitDataMiddleware.tsx';
import NewAppPanel from './panels/NewAppPanel/NewAppPanel.tsx';
import SelectProjectsPanel from './panels/ProjectsPanel/ProjectsPanel.tsx';
import QuizPanel from './panels/QuizPanel/QuizPanel.tsx';
import RoundResultPanel from './panels/RoundResultPanel/RoundResultPanel.tsx';

import type { GameEventDto } from '@/api';

import { useGameState } from '@/atoms/gameStateAtom';
import { GameLayout } from '@/components/layouts';
import { useGame } from '@/screens/GameScreen/hooks/useGame.ts';
import ActionsPanel from '@/screens/GameScreen/panels/ActionsPanel/ActionsPanel.tsx';
import EventPanel from '@/screens/GameScreen/panels/EventPanel/EventPanel.tsx';
import GameResultPanel from '@/screens/GameScreen/panels/GameResultPanel/GameResultPanel.tsx';
import IntroProjectsPanel from '@/screens/GameScreen/panels/IntroProjectsPanel/IntroProjectsPanel.tsx';

const GameScreen = () => {
    const [event, setEvent] = useState<GameEventDto | null>(null);
    const [isResultRoundPanel, setIsResultRoundPanel] = useState(false);
    const [isNewAppPanel, setIsNewAppPanel] = useState(false);
    const prevRoundId = useRef<string>(null);
    const { gameSelect, selectResult } = useGame();
    const currentState = useGameState();

    useEffect(() => {
        if (selectResult?.event) {
            setIsResultRoundPanel(true);
            setEvent(selectResult.event);
        }
    }, [selectResult]);

    useEffect(() => {
        if (prevRoundId.current && currentState.currentRoundId) {
            setIsNewAppPanel(true);
        }

        prevRoundId.current = currentState.currentRoundId;
    }, [currentState.currentRoundId]);

    useEffect(() => {
        if (currentState?.isFinished) {
            prevRoundId.current = null;
        }
    }, [currentState?.isFinished]);

    const isQuiz = currentState?.screenType === 'quiz';
    const isActions = currentState?.screenType === 'actions';
    const isFinished = currentState?.isFinished;
    const isSelectProjects =
        currentState?.screenType === 'projects' &&
        (!selectResult || selectResult?.allChoices?.projects.length > 0);
    const isWithIntroProjects = currentState?.screenType === 'projects' && !isSelectProjects;

    const onClearEvent = useCallback(() => {
        setEvent(null);
    }, []);

    const CurrentPanel = () => {
        if (event) {
            return <EventPanel event={event} onClearEvent={onClearEvent} />;
        }

        if (isResultRoundPanel) {
            return (
                <RoundResultPanel
                    selectResult={selectResult!}
                    onClose={() => {
                        setIsResultRoundPanel(false);
                    }}
                />
            );
        }

        if (isNewAppPanel) {
            return <NewAppPanel onClose={() => setIsNewAppPanel(false)} />;
        }

        if (isQuiz) {
            return <QuizPanel gameSelect={gameSelect} />;
        }

        if (isActions) {
            return <ActionsPanel gameSelect={gameSelect} />;
        }

        if (isWithIntroProjects) {
            return <IntroProjectsPanel selectResult={selectResult!} gameSelect={gameSelect} />;
        }

        if (isSelectProjects) {
            return <SelectProjectsPanel selectResult={selectResult!} gameSelect={gameSelect} />;
        }
    };

    if (isFinished) {
        return <GameResultPanel />;
    }

    return (
        <GameLayout.Screen>
            <GameLayout.HUD
                balance={currentState?.currentBalance.cash ?? 0}
                techDept={currentState?.currentBalance.techDebt ?? 0}
                speed={currentState?.currentBalance.developingSpeed ?? 0}
            />
            <CurrentPanel />
        </GameLayout.Screen>
    );
};

export default withInitDataMiddleware(GameScreen);
