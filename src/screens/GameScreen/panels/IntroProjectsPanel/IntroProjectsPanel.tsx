import { type FC, useMemo } from 'react';

import type { GamePanelComponentProps } from '@/screens/GameScreen/types/GamePanelComponentProps.ts';

import { useGameState } from '@/atoms/gameStateAtom.ts';
import { useGamePanelSwitcher } from '@/screens/GameScreen/hooks/useGamePanelSwitcher.ts';
import IntroProjectsStepOnePanel from '@/screens/GameScreen/panels/IntroProjectsPanel/steps/IntroProjectsStepOnePanel/IntroProjectsStepOnePanel.tsx';
import IntroProjectsStepTwoPanel from '@/screens/GameScreen/panels/IntroProjectsPanel/steps/IntroProjectsStepTwoPanel/IntroProjectsStepTwoPanel.tsx';
import SelectProjectsPanel from '@/screens/GameScreen/panels/ProjectsPanel/ProjectsPanel.tsx';

const IntroProjectsPanel: FC<GamePanelComponentProps> = (props) => {
    const currentState = useGameState();

    const steps = useMemo(() => {
        const baseSteps = [
            IntroProjectsStepOnePanel,
            IntroProjectsStepTwoPanel,
            SelectProjectsPanel,
        ];

        if (currentState.currentRoundId === 'round_web_app') {
            return baseSteps;
        }

        return [IntroProjectsStepOnePanel, SelectProjectsPanel];
    }, [currentState.currentRoundId]);

    const { CurrentStep, ...stepProps } = useGamePanelSwitcher(steps);

    return <CurrentStep {...stepProps} {...props} />;
};

export default IntroProjectsPanel;
