import BrandLogoImage from '/images/brand-logo.png';

const BrandLogo = () => {
    return (
        <div className={'w-full'}>
            <img src={BrandLogoImage} alt={'yatravel'} className={''} />
            {/*<div className="pointer-events-none  text-4xl whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center font-bold leading-none tracking-tighter text-transparent">*/}
            {/*    Я.Путешествия*/}
            {/*</div>*/}
        </div>
    );
};

export default BrandLogo;
