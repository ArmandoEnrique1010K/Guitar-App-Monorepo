type Props = {
    size: 'small' | 'large';
};

export const LogoGuitar = ({ size }: Props) => {
    return (
        <img
            src="/guitar.svg"
            alt="Guitar"
            className={size === 'large' ? 'sm:w-36 w-24' : 'sm:w-16 w-12'}
        />
    );
};
