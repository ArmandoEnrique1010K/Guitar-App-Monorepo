type Props = {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
};

export const HorizontalButtonGroup = ({
    label,
    options,
    value,
    onChange,
}: Props) => {
    const handleChange = (value: string) => {
        onChange(value);
    };

    return (
        <div className="flex flex-row gap-2 items-center w-full text-xs font-bold uppercase tracking-wide">
            {label && (
                <div className="flex justify-between items-center">
                    {<span className="text-green-500">{label}</span>}
                </div>
            )}
            {options.map((option) => {
                return (
                    <button
                        key={option}
                        className={`px-2 py-1 border border-slate-600
                             hover:bg-slate-700 hover:text-green-500 flex-1 ${
                                 value === option
                                     ? 'bg-green-500 text-black'
                                     : 'bg-black text-green-500'
                             }`}
                        onClick={() => handleChange(option)}
                    >
                        {option}
                    </button>
                );
            })}
        </div>
    );
};
