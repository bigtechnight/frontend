import { type ComponentProps, type FC } from 'react';

export const BadEventIcon: FC<ComponentProps<'svg'>> = ({ color, ...props }) => {
    return (
        <svg
            width="97"
            height="100"
            viewBox="0 0 97 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect y="20" width="97" height="60" fill="currentColor" />
            <rect x="14" width="69" height="10" fill="currentColor" />
            <rect x="14" y="90" width="69" height="10" fill="currentColor" />
            <rect x="6" y="10" width="85" height="10" fill="currentColor" />
            <rect x="6" y="80" width="85" height="10" fill="currentColor" />
            <path
                d="M43.25 59.125V31H60.125V47.875H54.5V59.125H43.25ZM43.25 70.375V64.75H54.5V70.375H43.25Z"
                fill={color}
            />
        </svg>
    );
};
