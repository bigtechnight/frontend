import { type FC } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router';

const variants = {
    in: {
        opacity: 1,
        transition: {
            duration: 0.4,
            delay: 0,
            ease: 'easeInOut',
        },
    },
    out: {
        opacity: 0,
        transition: {
            duration: 0,
        },
    },
} as const;

const RootLayout: FC = () => {
    const location = useLocation();

    return (
        <div className="flex flex-col min-h-dvh">
            <main className={'flex flex-col flex-1 noise'}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        variants={variants}
                        animate="in"
                        initial="out"
                        exit="out"
                        className={'flex flex-col flex-1'}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default RootLayout;
