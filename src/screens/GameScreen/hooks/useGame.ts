import { useCallback, useState } from 'react';

import { useAtom } from 'jotai';

import type { SelectDto, SelectResultDto } from '@/api';

import { GameApiRequest, withToken } from '@/api/request.ts';
import { fetchCurrentGameStateAtom } from '@/atoms/gameStateAtom.ts';

export function useGame() {
    const [selectResult, setSelectResult] = useState<SelectResultDto | null>(null);
    const [, refetchCurrentState] = useAtom(fetchCurrentGameStateAtom);

    const gameSelect = useCallback(
        async (data: SelectDto, pass = false) => {
            const response = await GameApiRequest.gameSelect(
                {
                    selectDto: data,
                },
                withToken(),
            );

            if (!pass) {
                setSelectResult(response.data);
                refetchCurrentState();
            }
        },
        [refetchCurrentState],
    );

    return { selectResult, gameSelect };
}
