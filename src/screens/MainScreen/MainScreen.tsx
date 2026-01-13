import { motion } from 'framer-motion';

import RetroBackground from './components/RetroBackground.tsx';

import { GameLayout } from '@/components/layouts';
import BrandLogo from '@/screens/MainScreen/components/BrandLogo.tsx';
import LeaderBoard from '@/screens/MainScreen/components/LeaderBoard.tsx';
import MainMenu from '@/screens/MainScreen/components/MainMenu.tsx';

const MainScreen = () => {
    return (
        <GameLayout.Screen>
            <RetroBackground />
            <div>
                <div className={'flex flex-col justify-between relative h-screen'}>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0, y: 300 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{
                            opacity: { duration: 0.8, ease: 'easeOut' },
                            scale: { duration: 0.8, ease: 'easeOut' },
                            y: { delay: 1, duration: 1, ease: 'circInOut' },
                        }}
                    >
                        <BrandLogo />
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.6, duration: 1 }}
                        className={'w-full sm:max-w-[38rem] mb-10 mx-auto min-h-0'}
                    >
                        <LeaderBoard />
                    </motion.div>
                    <div className={'mb-30 w-full max-w-[34rem] mx-auto'}>
                        <MainMenu />
                    </div>
                </div>
            </div>
        </GameLayout.Screen>
    );
};

export default MainScreen;
