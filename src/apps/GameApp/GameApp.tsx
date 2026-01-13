import { useLayoutEffect } from 'react';

import { useAtom } from 'jotai';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router';

import { hasToken } from '@/api/request';
import { fetchGameDataAtom, gameDataAtom } from '@/atoms/gameDataAtom';
import OrientationGuard from '@/components/layouts/OrientationGuard/OrientationGuard.tsx';
import RootLayout from '@/components/layouts/RootLayout/RootLayout.tsx';
import {
    GameScreenRoute,
    MainScreenRoute,
    OnboardingScreenRoute,
    ResultsScreenRoute,
    UserNameScreenRoute,
} from '@/screens';

const AuthRedirect = () => {
    const location = useLocation();

    if (hasToken() && location.pathname !== GameScreenRoute.path) {
        return <Navigate to={GameScreenRoute.path} replace />;
    }

    return null;
};

const GameApp = () => {
    const [gameData] = useAtom(gameDataAtom);
    const [, fetchGameData] = useAtom(fetchGameDataAtom);

    useLayoutEffect(() => {
        fetchGameData();
    }, [fetchGameData]);

    if (!gameData.data) {
        return null;
    }

    return (
        <OrientationGuard>
            <BrowserRouter>
                <AuthRedirect />
                <Routes>
                    <Route element={<RootLayout />}>
                        <Route index element={<MainScreenRoute />} />
                        <Route path={ResultsScreenRoute.path} element={<ResultsScreenRoute />} />
                        <Route path={GameScreenRoute.path} element={<GameScreenRoute />} />
                        <Route path={UserNameScreenRoute.path} element={<UserNameScreenRoute />} />
                        <Route
                            path={OnboardingScreenRoute.path}
                            element={<OnboardingScreenRoute />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </OrientationGuard>
    );
};

export default GameApp;
