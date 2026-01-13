import { useLayoutEffect } from 'react';

import { removeToken } from '@/api/request';

const useRemoveToken = () => {
    useLayoutEffect(() => {
        removeToken();
    }, []);
};

export default useRemoveToken;
