import type { FC } from 'react';

import { Card, type BitCardProps } from '@/components/ui/8bit/card.tsx';
import { useDeviceType } from '@/hooks/useDeviceType.ts';
import { cn } from '@/lib/utils.ts';

export interface FinalResultCard extends BitCardProps {
    variant?: 'cashCard' | 'scoreCard';
}

export const FinalResultCard: FC<FinalResultCard> = ({
    children,
    variant = 'scoreCard',
    className,
    ...props
}) => {
    const { isMobile } = useDeviceType();
    return (
        <div
            className={cn(
                'flex justify-center items-center relative w-full',
                isMobile ? 'p-3' : 'p-6',
                className,
            )}
            {...props}
        >
            {variant === 'cashCard' && (
                <Card
                    borderSize={isMobile ? 8 : 10}
                    className={cn(
                        'absolute pointer-events-none h-full w-full border-[#170e4d85] bg-[#170e4d85]',
                    )}
                    aria-hidden="true"
                />
            )}
            <Card
                borderSize={isMobile ? 8 : 10}
                className={cn(
                    'items-center h-full uppercase w-full py-12 ',
                    variant === 'cashCard' && 'border-[#5B3284] bg-[#170E4D]',
                    variant === 'scoreCard' && 'border-[#5528AB] bg-[#2F234F]',
                )}
            >
                {children}
            </Card>
        </div>
    );
};
