import { motion } from 'framer-motion';

import MainGooseImage from '/images/main-goose.png?url';

export const MainGooseImg = () => {
    return (
        <motion.img
            initial={{
                opacity: 0,
                y: 80,
                scale: 0.7,
                rotate: -45,
                filter: 'blur(10px)',
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
                filter: 'blur(0px)',
            }}
            transition={{
                type: 'spring',
                stiffness: 120,
                damping: 18,
                mass: 0.6,
            }}
            src={MainGooseImage}
            alt={''}
            className={'self-center w-[34rem] h-auto mb-6'}
        />
    );
};
