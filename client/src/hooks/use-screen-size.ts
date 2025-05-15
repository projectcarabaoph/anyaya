import { useState, useEffect } from 'react';
import type { IScreenSize } from '@hooks/_types';


export const useScreenSize = (): IScreenSize => {
    const [screenSize, setScreenSize] = useState<IScreenSize>({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setScreenSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            };

            handleResize();

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    return screenSize;
};