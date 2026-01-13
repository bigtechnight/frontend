import React from 'react';

export const MaskIcon: React.FC<React.ComponentProps<'svg'>> = (props) => {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M8.77344 0.0209961H13.2256V0.000488281H15.4521V0.0209961H18.5947V3.67529H22V19.5093H18.5947V21.9448H15.7139V21.9995H13.6191V18.3452H15.4521V13.4185H17.8096V8.54639H15.4521V5.49951H13.6191V9.76514H8.38086V5.49951H6.54785V8.54639H4.19043V13.4185H6.54785V18.3452H8.38086V21.9995H6.28516V21.9448H3.4043V19.5093H0V3.67529H3.4043V0.0209961H6.54785V0.000488281H8.77344V0.0209961Z"
                fill="currentColor"
            />
        </svg>
    );
};
