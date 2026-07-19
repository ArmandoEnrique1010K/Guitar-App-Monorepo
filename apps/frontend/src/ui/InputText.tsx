import React from 'react';

type Props = {
    label?: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputText = ({
    label,
    name,
    placeholder,
    value,
    onChange,
}: Props) => {
    return (
        <div className="flex flex-col">
            {label && (
                <label htmlFor={name} className="font-bold mb-2">
                    {label}:
                </label>
            )}
            <input
                id={name}
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full flex-1

                        bg-black
                        text-green-400
                        placeholder-green-500/40

                        px-3
                        py-2

                        outline-none

                        border-2
                        border-slate-800
                         text-sm tracking-wide 
"
            />
        </div>
    );
};
