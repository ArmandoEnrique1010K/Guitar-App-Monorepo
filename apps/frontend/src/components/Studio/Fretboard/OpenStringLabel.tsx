type Props = {
    value: string;
    title: string;
};

export const OpenStringLabel = ({ value, title }: Props) => {
    return (
        <div
            title={title}
            className="
                flex
                flex-col
                items-center
                justify-center

                w-5
                h-full
                gap-2

                shrink-0
            "
        >
            <div className="w-1 flex-1 bg-green-700" />

            <span
                className="
                    shrink-0
                    text-green-500
                    text-sm
                    font-bold
                "
            >
                {value}
            </span>

            <div className="w-1 flex-1 bg-green-700" />
        </div>
    );
};
