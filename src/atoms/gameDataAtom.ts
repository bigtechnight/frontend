import { atom, useAtom } from 'jotai';

import type { GameDto } from '@/api';

import { GameApiRequest } from '@/api/request';

export const gameDataAtom = atom<{ loading: boolean; data: GameDto | null; error: string | null }>({
    loading: true,
    data: null,
    error: null,
});

export const fetchGameDataAtom = atom(null, async (_, set) => {
    set(gameDataAtom, { loading: true, data: null, error: null });

    try {
        const response = await GameApiRequest.gameData();
        if (response.status === 200) {
            set(gameDataAtom, {
                loading: false,
                data: response.data,
                error: null,
            });
        } else {
            set(gameDataAtom, {
                loading: false,
                data: null,
                error: `HTTP Error: ${response.status}`,
            });
        }
    } catch (error) {
        set(gameDataAtom, {
            loading: false,
            data: null,
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});

export const useGameData = () => {
    const [gameData] = useAtom(gameDataAtom);
    return gameData.data as GameDto;
};
