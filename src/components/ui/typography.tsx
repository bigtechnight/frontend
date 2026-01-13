import type { CSSProperties, FC } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { TypingAnimation } from '@/components/shaders/typing-animation.tsx';
import { cn } from '@/lib/utils.ts';

export const typographyVariants = cva('', {
    variants: {
        variant: {
            title: 'text-3xl text-foreground uppercase',
            subtitle: 'text-xl text-muted-foreground',
            text: '',
            link: 'text-foreground',
        },
    },
    defaultVariants: {
        variant: 'text',
    },
});

export interface TypographyProps
    extends React.ComponentPropsWithoutRef<typeof TypingAnimation>,
        VariantProps<typeof typographyVariants> {
    animated?: boolean;
    children: string;
}

const Typography: FC<TypographyProps> = ({
    variant,
    className,
    animated,
    children,
    style,
    ...props
}) => {
    if (animated) {
        return (
            <TypingAnimation className={cn(typographyVariants({ variant }), className)} {...props}>
                {children}
            </TypingAnimation>
        );
    }

    return (
        <div
            className={cn(typographyVariants({ variant }), className)}
            style={style as CSSProperties}
        >
            {children}
        </div>
    );
};

export { Typography };
