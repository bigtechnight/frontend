import { useCallback } from 'react';

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/8bit/button.tsx';
import i18n from '@/i18n';
import { ResultsScreenRoute, UserNameScreenRoute } from '@/screens';

const getMenu = () =>
    [
        {
            text: i18n.t('play'),
            url: UserNameScreenRoute.path,
            variant: 'primary',
        },
        {
            text: i18n.t('results'),
            url: ResultsScreenRoute.path,
            variant: 'accent',
        },
    ] as const;

const MainMenu = () => {
    const navigate = useNavigate();

    const goMenuItem = useCallback(
        (url: string) => {
            return () =>
                navigate(url, {
                    replace: true,
                });
        },
        [navigate],
    );

    return (
        <div className={'flex flex-col gap-14'}>
            {getMenu().map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: 1,
                        x: [0, -4, 3, -2, 2, 0],
                        y: [0, -2, 2, -1, 1, 0],
                        textShadow: [
                            '0px 0px 0px #0ff',
                            '20px 4px 30px #f0f',
                            '-20px -4px 30px #0ff',
                            '0px 0px 0px #f0f',
                        ],
                        scale: 1,
                    }}
                    transition={{
                        opacity: { delay: 2 + index * 0.2 },
                        x: { delay: 2 + index * 0.2, duration: 0.3 },
                        y: { delay: 2 + index * 0.2, duration: 0.3 },
                        textShadow: { delay: 2 + index * 0.2, duration: 0.3 },

                        ease: 'easeOut',
                    }}
                    className={'w-full'}
                >
                    <Button
                        asChild
                        className={'w-full'}
                        variant={item.variant}
                        onClick={goMenuItem(item.url)}
                    >
                        {item.text}
                    </Button>
                </motion.div>
            ))}
        </div>
    );
};

export default MainMenu;
