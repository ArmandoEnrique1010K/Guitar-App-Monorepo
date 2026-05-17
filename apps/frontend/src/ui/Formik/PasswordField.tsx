import { ErrorMessage, Field } from 'formik';
import { useState } from 'react';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';

type Props = {
    id: string;
    label: string;
    placeholder?: string;
};

export const PasswordField = ({ id, label, placeholder }: Props) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col gap-0.5">
            <label htmlFor={id} className="text-sm">
                {label}:
            </label>
            <div className="flex justify-between sm:gap-3 gap-2">
                <Field
                    name={id}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    className="border border-gray-300 rounded px-3 py-2 flex-1"
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-3 text-sm bg-zinc-300 rounded hover:bg-zinc-400 "
                >
                    {showPassword ? (
                        <EyeOpenIcon className="size-6" />
                    ) : (
                        <EyeClosedIcon className="size-6" />
                    )}
                </button>
            </div>
            <div className="h-4">
                <ErrorMessage
                    name={id}
                    component="p"
                    className="text-red-500 text-xs"
                />
            </div>
        </div>
    );
};
