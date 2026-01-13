import { type FC, useCallback, useState } from 'react';

export interface UseGamePanelSwitcherProps {
    next: () => void;
}

export function useGamePanelSwitcher<T = UseGamePanelSwitcherProps>(steps: FC<T>[]) {
    const [index, setIndex] = useState(0);

    const next = useCallback(() => {
        if (index < steps.length - 1) {
            setIndex((prev) => prev + 1);
        }
    }, [index, steps.length]);

    return {
        CurrentStep: steps[index] || null,
        next,
    };
}
