import { type ComponentPropsWithoutRef, type FC } from 'react';

import { motion } from 'framer-motion';

import { cn } from '@/lib/utils.ts';

interface StepIndicatorProps {
    stepFormat: (currentStep: number, totalSteps: number) => string;
    current: number;
    total: number;
    className?: string;
    innerRef?: React.RefObject<HTMLDivElement | null>;
}

const MotionAnimation: FC<ComponentPropsWithoutRef<typeof motion.div>> = ({
    transition,
    ...props
}) => {
    return (
        <motion.div
            animate={{
                scale: [1, 1.5, 1],
                filter: ['brightness(2)', 'brightness(1)'],
            }}
            transition={{
                duration: 0.2,
                ease: 'easeIn',
                ...transition,
            }}
            {...props}
        />
    );
};

const StepIndicator: FC<StepIndicatorProps> = ({
    stepFormat,
    current,
    total,
    className,
    innerRef,
}) => {
    return (
        <div ref={innerRef} className={cn('flex items-center justify-center', className)}>
            <div className={'flex items-center gap-4 h-12'}>
                {[...Array(total)].map((_, index) => {
                    const step = index + 1;
                    const isActive = step === current;
                    const isPrev = step < current;
                    const transition = {
                        delay: index * 0.1,
                    };

                    if (isPrev) {
                        return (
                            <MotionAnimation
                                key={index}
                                transition={transition}
                                className="relative size-3 bg-primary"
                            />
                        );
                    }

                    if (isActive) {
                        return (
                            <MotionAnimation
                                key={index}
                                transition={transition}
                                className="text-2xl text-primary mt-0.5"
                            >
                                {stepFormat(step, total)}
                            </MotionAnimation>
                        );
                    }

                    return (
                        <MotionAnimation
                            key={index}
                            transition={transition}
                            className="relative size-3"
                        >
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-[#6D667F] -translate-y-1/2"></div>
                            <div className="absolute left-1/2 top-0 h-full w-1 bg-[#6D667F] -translate-x-1/2"></div>
                        </MotionAnimation>
                    );
                })}
            </div>
        </div>
    );
};

export { StepIndicator };
