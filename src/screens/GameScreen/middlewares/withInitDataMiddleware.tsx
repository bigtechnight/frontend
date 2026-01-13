import { useLayoutEffect } from 'react';
import type { ComponentType } from 'react';

import { useAtom } from 'jotai';
import { useNavigate } from 'react-router';

import { hasToken } from '@/api/request.ts';
import { currentGameStateAtom, fetchCurrentGameStateAtom } from '@/atoms/gameStateAtom.ts';

export function withInitDataMiddleware<T>(WrappedComponent: ComponentType<T>) {
    return (props: T) => {
        const navigate = useNavigate();
        const [currentState] = useAtom(currentGameStateAtom);
        const [, refetchCurrentState] = useAtom(fetchCurrentGameStateAtom);

        useLayoutEffect(() => {
            if (hasToken()) {
                refetchCurrentState();
            } else {
                window.location.href = '/';
            }
        }, [navigate, refetchCurrentState]);

        if (!currentState) return null;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return <WrappedComponent {...props} />;
    };
}
