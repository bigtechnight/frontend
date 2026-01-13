import { atom, useAtom } from 'jotai';

import type { CurrentGameStateDto } from '@/api';

import { GameApiRequest, withToken } from '@/api/request';

// Атом для текущего состояния игры
export const currentGameStateAtom = atom<CurrentGameStateDto | undefined>(undefined);

// Атом-счетчик для принудительного обновления компонентов
export const gameCounterAtom = atom<number>(0);

// Атом для загрузки текущего состояния игры
export const fetchCurrentGameStateAtom = atom(null, async (get, set) => {
    try {
        const response = await GameApiRequest.gameCurrent(withToken());
        set(currentGameStateAtom, response.data);
        set(gameCounterAtom, get(gameCounterAtom) + 1);
    } catch (error) {
        console.error('Failed to fetch current game state:', error);
        // Можно добавить обработку ошибок
    }
});

// Хук для получения текущего состояния игры - только в случае уже полученной информации
export const useGameState = () => {
    const [currentState] = useAtom(currentGameStateAtom);

    if (!currentState) {
        throw new Error('Current game state is not available');
    }

    return currentState;
};
