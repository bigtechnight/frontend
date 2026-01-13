import { useCallback, useLayoutEffect, useState } from 'react';

import { useNavigate } from 'react-router';

import type { GameApiGameLeaderboardRequest, LeaderBoardDto, LeaderboardResponseDto } from '@/api';

import { GameApiRequest } from '@/api/request.ts';
import { GameLayout } from '@/components/layouts';
import { Button } from '@/components/ui/8bit/button.tsx';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/8bit/table.tsx';
import { Typography } from '@/components/ui/typography.tsx';
import { CHAR_NARROW_SPACE, CHAR_RUBLE } from '@/constants/charCodes.ts';
import { truncateString } from '@/lib/truncateString.ts';
import { cn } from '@/lib/utils.ts';
import { MainScreenRoute } from '@/screens';
import { PaginationCore } from '@/screens/ResultsScreen/components/PaginationCore.tsx';

const ResultsScreen = () => {
    const [leaderBoard, setLeaderBoard] = useState<LeaderBoardDto[]>([]);
    const [page, setPage] = useState<
        Pick<LeaderboardResponseDto, 'currentPage' | 'totalPages' | 'hasNextPage'>
    >({
        currentPage: 1,
        totalPages: 1,
        hasNextPage: false,
    });
    const navigate = useNavigate();

    const goToMainMenu = useCallback(() => {
        navigate(MainScreenRoute.path);
    }, [navigate]);

    const fetchLeaderBoard = useCallback(
        async (requestParameters?: GameApiGameLeaderboardRequest) => {
            const { data } = await GameApiRequest.gameLeaderboard(requestParameters);
            setLeaderBoard(data.players.sort((a, b) => a.place - b.place));
            const { currentPage, totalPages, hasNextPage } = data;
            setPage({ currentPage, totalPages, hasNextPage });
        },
        [],
    );

    useLayoutEffect(() => {
        fetchLeaderBoard();
    }, [fetchLeaderBoard]);

    return (
        <GameLayout.Screen>
            <Typography
                variant="title"
                className="flex w-full text-center justify-center text-primary mt-20 mb-20 text-5xl"
            >
                Лучшие игроки
            </Typography>
            <div className="flex justify-center mb-[150px]">
                <Table variant={'borderless'} rootClassName="w-[75%]" className="w-full">
                    <TableBody>
                        {leaderBoard.map((leader, index) => (
                            <TableRow key={index}>
                                <TableCell className="w-10 text-xl text-right text-muted-foreground">
                                    {leader.place}
                                </TableCell>
                                <TableCell className="w-1/2 text-xl font-medium max-w-1/2 truncate">
                                    {truncateString(leader.name)}
                                </TableCell>
                                <TableCell
                                    className={cn('w-1/2 text-xl text-right', {
                                        'text-primary': index < 3,
                                    })}
                                >
                                    {Math.round(leader.cash)}
                                    {CHAR_NARROW_SPACE}
                                    {CHAR_RUBLE}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <GameLayout.FloatingFooter>
                <div className="flex flex-col gap-10 w-full">
                    <PaginationCore
                        className={'justify-center'}
                        currentPage={page.currentPage}
                        totalPages={page.totalPages}
                        maxPages={3}
                        onPageChange={(page) => fetchLeaderBoard({ page })}
                    />
                    <Button onClick={goToMainMenu} className="w-full">
                        Назад
                    </Button>
                </div>
            </GameLayout.FloatingFooter>
        </GameLayout.Screen>
    );
};
export default ResultsScreen;
