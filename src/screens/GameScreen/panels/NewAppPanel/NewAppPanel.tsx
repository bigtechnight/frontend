import { memo, type FC } from 'react';

import { motion } from 'framer-motion';
import { useAtom } from 'jotai';

import { useGameData } from '@/atoms/gameDataAtom';
import { useGameState } from '@/atoms/gameStateAtom';
import { userNameAtom } from '@/atoms/userAtom.ts';
import { StartRoundNotification } from '@/components/common/StartRoundNotification';
import { GameLayout } from '@/components/layouts';
import { Button } from '@/components/ui/8bit/button';
import { delayTransition } from '@/lib/delayTransition';

const delay = delayTransition(1, 0.5);

interface INewAppPanelProps {
    onClose: () => void;
}

const NewAppPanel: FC<INewAppPanelProps> = ({ onClose }) => {
    const gameData = useGameData();
    const currentState = useGameState();
    const [name] = useAtom(userNameAtom);

    const currentRound = gameData?.rounds.find((round) => round.id === currentState.currentRoundId);

    const webAppName = currentRound?.name;

    return (
        <GameLayout.Panel variant={'gradient'}>
            <StartRoundNotification userName={name} delay={delay} webAppName={webAppName || ''} />

            <GameLayout.FloatingFooter>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.2, ease: 'easeInOut' }}
                    className={'w-full'}
                >
                    <Button className={'w-full'} variant={'primary'} onClick={onClose}>
                        Погнали
                    </Button>
                </motion.div>
            </GameLayout.FloatingFooter>
        </GameLayout.Panel>
    );
};

export default memo(NewAppPanel);
