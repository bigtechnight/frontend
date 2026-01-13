import { useCallback, useLayoutEffect, useState } from 'react';

import type { LeaderBoardDto } from '@/api';

import { GameApiRequest } from '@/api/request.ts';
import { AuroraText } from '@/components/shaders/aurora-text.tsx';
import { SparklesText } from '@/components/shaders/sparkles-text.tsx';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/8bit/table.tsx';
import { CHAR_NARROW_SPACE, CHAR_RUBLE } from '@/constants/charCodes';
import i18n from '@/i18n';
import { truncateString } from '@/lib/truncateString.ts';

const LeaderBoard = () => {
    const [leaderBoard, setLeaderBoard] = useState<LeaderBoardDto[]>([]);

    const fetchLeaderBoard = useCallback(async () => {
        const { data } = await GameApiRequest.gameLeaderboard();
        setLeaderBoard(data.players.sort((a, b) => a.place - b.place));
    }, []);

    useLayoutEffect(() => {
        fetchLeaderBoard();
    }, [fetchLeaderBoard]);

    return (
        <div className={'flex flex-col w-full h-full'}>
            <SparklesText className={'text-3xl text-center font-bold'}>
                <AuroraText>{i18n.t('topPlayers')}</AuroraText>
            </SparklesText>
            <div className={'w-full flex justify-center h-full overflow-x-hidden'}>
                <Table variant={'borderless'} className="w-full">
                    <TableBody>
                        {leaderBoard.map((leader, index) => (
                            <TableRow key={index}>
                                <TableCell className="w-10 text-xl text-right ">
                                    {leader.place}.
                                </TableCell>
                                <TableCell className="w-1/2 text-xl font-medium">
                                    {truncateString(leader.name, 16)}
                                </TableCell>
                                <TableCell className="w-1/2 text-xl text-right ">
                                    {Math.round(leader.cash)}
                                    {CHAR_NARROW_SPACE}
                                    {CHAR_RUBLE}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default LeaderBoard;
