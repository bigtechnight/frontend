import { useMemo } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { Button as ShadcnButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const buttonVariants = cva('', {
    variants: {
        font: {
            normal: '',
            retro: 'retro',
        },
        variant: {
            primary: 'bg-primary text-foreground',
            black: 'bg-background text-foreground',
            accent: 'bg-foreground text-background',
            link: 'text-foreground',
        },
        size: {
            default: 'px-6 py-2 has-[>svg]:px-3 text-3xl ',
            link: 'px-0 py-2 has-[>svg]:px-3 text-xl',
        },
    },
    defaultVariants: {
        variant: 'primary',
        size: 'default',
    },
});

export interface BitButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    ref?: React.Ref<HTMLButtonElement>;
}

function Button({ children, asChild, ...props }: BitButtonProps) {
    const { variant, size, className, font } = props;

    const pixels = useMemo(
        () => (
            <>
                <div className="absolute bg-inherit -top-3 w-1/2 left-3 h-3 " />
                <div className="absolute bg-inherit -top-3 w-1/2 right-3 h-3 " />
                <div className="absolute bg-inherit -bottom-3 w-1/2 left-3 h-3 " />
                <div className="absolute bg-inherit -bottom-3 w-1/2 right-3 h-3 " />
                <div className="absolute bg-inherit top-0 left-0 size-3 " />
                <div className="absolute bg-inherit top-0 right-0 size-3 " />
                <div className="absolute bg-inherit bottom-0 left-0 size-3 " />
                <div className="absolute bg-inherit bottom-0 right-0 size-3 " />
                <div className="absolute bg-inherit top-3 -left-3 h-3/5 w-3 " />
                <div className="absolute bg-inherit top-3 -right-3 h-3/5 w-3" />
            </>
        ),
        [],
    );

    return (
        <ShadcnButton
            {...props}
            className={cn(
                'rounded-none active:translate-y-1 transition-transform relative inline-flex items-center justify-center gap-3 uppercase',
                font !== 'normal' && 'retro',
                buttonVariants({ variant, size }),
                className,
            )}
            asChild={asChild}
        >
            {asChild ? (
                <span className="relative inline-flex items-center justify-center gap-3">
                    {children}
                    {pixels}
                </span>
            ) : (
                <>
                    {children}
                    {pixels}
                </>
            )}
        </ShadcnButton>
    );
}

export { Button };
