type Props = {
    title: string;
};

export const AuthTitle = ({ title }: Props) => {
    return (
        <h2 className="sm:text-3xl text-2xl font-light text-center text-black pb-6">
            {title}
        </h2>
    );
};
