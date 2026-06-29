import React from 'react';

type Props = {
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputText = ({ name, placeholder, value, onChange }: Props) => {
    return (
        <input
            type="text"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full                         flex-1

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
    );
};
