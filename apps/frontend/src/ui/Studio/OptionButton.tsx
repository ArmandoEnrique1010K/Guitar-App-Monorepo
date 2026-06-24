import { TriangleDownIcon } from '@radix-ui/react-icons';

type Props = {
    value: string;
    options: string[];
    onChange: (value: string) => void;
    title?: string;
};

export const OptionButton = ({ value, options, onChange, title }: Props) => {
    return (
        <div
            className="
                relative
                flex
                items-center

                border-2
                uppercase
                font-bold
                tracking-wide
                select-none

                bg-linear-to-b
                from-gray-300
                to-gray-400

                border-t-gray-200
                border-l-gray-200
                border-r-gray-800
                border-b-gray-800

                shadow-inner
                text-black
            "
            title={title}
        >
            <select
                id={`select-${title}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="
                    absolute
                    inset-0
                    opacity-0
                    cursor-pointer
                    z-10
                    w-full
                "
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>

            <div
                className="
        flex
        flex-row
        items-center
        justify-between

        w-full

        px-2
        py-1

        pointer-events-none
                "
            >
                <span className="text-xs flex-1 text-left">{value}</span>
                <div className="border-l border-l-gray-700 pl-1 sm:flex hidden">
                    <TriangleDownIcon className="size-5" />
                </div>
            </div>
        </div>
    );
};
