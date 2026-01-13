import { useState, useEffect } from 'react';

export function useDeviceType() {
    const getDeviceType = (width: number) => {
        if (width < 768) {
            return { isMobile: true, isTablet: false, isDesktop: false };
        } else if (width >= 768 && width < 1024) {
            return { isMobile: false, isTablet: true, isDesktop: false };
        } else {
            return { isMobile: false, isTablet: false, isDesktop: true };
        }
    };

    const [device, setDevice] = useState(getDeviceType(window.innerWidth));

    useEffect(() => {
        const handleResize = () => {
            setDevice(getDeviceType(window.innerWidth));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return device;
}
