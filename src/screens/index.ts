import { createRoute } from '@/lib/createRoute.ts';
import GameScreen from '@/screens/GameScreen/GameScreen.tsx';
import MainScreen from '@/screens/MainScreen/MainScreen.tsx';
import OnboardingScreen from '@/screens/OnboardingScreen/OnboardingScreen.tsx';
import ResultsScreen from '@/screens/ResultsScreen/ResultsScreen.tsx';
import UserNameScreen from '@/screens/UserNameScreen/UserNameScreen.tsx';

export const GameScreenRoute = createRoute(GameScreen, {
    path: '/game',
    label: 'Игра',
});

export const MainScreenRoute = createRoute(MainScreen, {
    path: '/',
    label: 'Главная',
});

export const ResultsScreenRoute = createRoute(ResultsScreen, {
    path: '/results',
    label: 'Результаты',
});

export const UserNameScreenRoute = createRoute(UserNameScreen, {
    path: '/user-name',
    label: 'Имя пользователя',
});

export const OnboardingScreenRoute = createRoute(OnboardingScreen, {
    path: '/onboarding',
    label: 'Обноардинг',
});
