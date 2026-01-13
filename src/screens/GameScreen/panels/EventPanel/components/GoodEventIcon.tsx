import { type ComponentProps, type FC } from 'react';

export const GoodEventIcon: FC<ComponentProps<'svg'>> = ({ color, ...props }) => {
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
                d="M28.5 70.375V64.75H22.875V59.125H17.25V53.5H11.625V47.875H17.25V42.25H22.875V36.625H28.5V31H39.75V36.625H34.125V42.25H28.5V47.875H22.875V53.5H28.5V59.125H34.125V64.75H39.75V70.375H28.5ZM56.625 70.375V64.75H62.25V59.125H67.875V53.5H73.5V47.875H67.875V42.25H62.25V36.625H56.625V31H67.875V36.625H73.5V42.25H79.125V47.875H84.75V53.5H79.125V59.125H73.5V64.75H67.875V70.375H56.625Z"
                fill={color}
            />
        </svg>
    );
};
