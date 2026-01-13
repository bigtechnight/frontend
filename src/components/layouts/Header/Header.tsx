import { type FC, useCallback } from 'react';

import { Link, useNavigate } from 'react-router';

import { Button } from '@/components/ui/8bit/button.tsx';
import i18n from '@/i18n';

interface HeaderProps {
    isBack?: boolean;
    backUrl?: string;
}

const Header: FC<HeaderProps> = ({ isBack, backUrl }) => {
    const navigate = useNavigate();

    const goBack = useCallback(() => navigate(-1), [navigate]);

    return (
        <header className="h-[var(--header-height)] absolute w-full top-0 z-40">
            <div className="mx-auto w-full pt-8 px-8 flex justify-between gap-3">
                {isBack && !backUrl && (
                    <Button onClick={goBack} variant={'link'} size={'link'} className="uppercase">
                        {`< ${i18n.t('back')}`}
                    </Button>
                )}
                {isBack && backUrl && (
                    <Button asChild variant={'link'} size={'link'} className="uppercase">
                        <Link to={backUrl}>{`< ${i18n.t('back')}`}</Link>
                    </Button>
                )}
            </div>
        </header>
    );
};

export default Header;
