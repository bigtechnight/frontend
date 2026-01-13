import type { CSSProperties } from 'react';

import { Slot } from '@radix-ui/react-slot';

import {
    Card as ShadcnCard,
    CardAction as ShadcnCardAction,
    CardContent as ShadcnCardContent,
    CardDescription as ShadcnCardDescription,
    CardFooter as ShadcnCardFooter,
    CardHeader as ShadcnCardHeader,
    CardTitle as ShadcnCardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface BitCardProps extends React.ComponentProps<'div'> {
    asChild?: boolean;
    borderSize?: number;
}

function Card({ asChild, children, className, borderSize = 6, style, ...props }: BitCardProps) {
    const Comp = asChild ? Slot : 'div';

    return (
        <Comp
            style={
                {
                    '--border-size': borderSize + 'px',
                    borderBlockWidth: 'var(--border-size)',
                    ...style,
                } as CSSProperties
            }
            className={cn('relative border-solid !p-0', className)}
            {...props}
        >
            <ShadcnCard className={cn('rounded-none border-0 !w-full', className)}>
                {children}
            </ShadcnCard>

            <div
                className="absolute inset-0 border-solid border-inherit pointer-events-none"
                style={{
                    borderInlineWidth: 'var(--border-size)',
                    marginInline: 'calc(-1 * var(--border-size))',
                }}
                aria-hidden="true"
            />
        </Comp>
    );
}

function CardHeader(props: BitCardProps) {
    return <ShadcnCardHeader {...props} />;
}

function CardTitle(props: BitCardProps) {
    return <ShadcnCardTitle {...props} />;
}

function CardDescription(props: BitCardProps) {
    return <ShadcnCardDescription {...props} />;
}

function CardAction(props: BitCardProps) {
    return <ShadcnCardAction {...props} />;
}

function CardContent(props: BitCardProps) {
    return <ShadcnCardContent {...props} />;
}

function CardFooter(props: BitCardProps) {
    return <ShadcnCardFooter data-slot="card-footer" {...props} />;
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
