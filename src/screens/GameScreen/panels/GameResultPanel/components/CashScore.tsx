import { useEffect, type FC } from 'react';

import { animate, motion, useMotionValue, useTransform } from 'framer-motion';

import { FinalResultCard } from './FinalResultCard.tsx';

import { SparklesText } from '@/components/shaders/sparkles-text.tsx';
import { Typography } from '@/components/ui/typography.tsx';
import { CHAR_RUBLE } from '@/constants/charCodes.ts';
import { cn } from '@/lib/utils.ts';

export const CashScore: FC<{
    cash?: number;
    variant?: FinalResultCard['variant'];
    title?: string;
    className?: string;
}> = ({ cash = 0, variant = 'cashCard', title = 'заработано', className }) => {
    const count = useMotionValue(0);
    const textCash = useTransform(count, (x) => `${Math.round(x)}${CHAR_RUBLE}`);

    useEffect(() => {
        const animation = animate(count, cash, { duration: 2 });

        return animation.stop;
    }, [cash, count]);

    const isCashCard = variant === 'cashCard';
    const WrapperText = isCashCard ? SparklesText : 'div';

    return (
        <FinalResultCard variant={variant} className={className}>
            <Typography
                variant={isCashCard ? 'title' : 'subtitle'}
                className={cn(isCashCard && 'text-[#F4ECC8]')}
            >
                {title}
            </Typography>
            <WrapperText className={'relative'}>
                <motion.div
                    className={cn(
                        isCashCard &&
                            'sm:text-6xl text-5xl bg-clip-text text-transparent bg-gradient-to-b from-[#FEED99] to-[#FD8704] brightness-50 mt-1.5',
                        !isCashCard &&
                            'text-6xl bg-clip-text text-transparent bg-gradient-to-b from-[#FFF8D5] to-[#5F5B57]',
                    )}
                >
                    {textCash}
                </motion.div>
                {isCashCard && (
                    <motion.div
                        className={
                            'sm:text-6xl text-5xl bg-clip-text text-transparent bg-gradient-to-b from-[#FEED99] to-[#FD8704] absolute top-0'
                        }
                    >
                        {textCash}
                    </motion.div>
                )}
            </WrapperText>
        </FinalResultCard>
    );
};
