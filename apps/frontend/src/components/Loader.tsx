type Props = {
    label?: string;
    className?: string;
    height?: string;
};

export const Loader = ({ label, className, height = 'h-full' }: Props) => {
    return (
        <div
            className={`bg-black flex flex-col justify-center items-center  text-center ${height}`}
        >
            <img
                src="/green-spinner.svg"
                className={className}
                alt="Spinner verde"
            />
            {label && (
                <h2 className="text-green-500 font-shockwave text-4xl font-thin">
                    {label}
                </h2>
            )}
        </div>
    );
};
