import React from 'react';

export const CubokIcon: React.FC<React.ComponentProps<'svg'>> = (props) => {
    return (
        <svg
            width="72"
            height="63"
            viewBox="0 0 72 63"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M63 9H54V36H63V45H45V54H63V63H9V54H27V45H9V36H18V9H9V0H63V9ZM9 36H0V9H9V36ZM72 36H63V9H72V36Z"
                fill="#E6E1CB"
            />
        </svg>
    );
};
