type Props = {
    size: 'small' | 'large';
};

export const LogoGuitar = ({ size }: Props) => {
    return (
        <img
            src="/guitar.svg"
            alt="Guitar"
            className={size === 'large' ? 'sm:w-32 w-20' : 'sm:w-12 w-8'}
        />
    );
};
