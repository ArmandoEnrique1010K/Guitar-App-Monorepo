import { ErrorMessage, Field } from "formik";
import { useState } from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

type Props = {
    id: string;
    label: string;
    placeholder?: string;
};

export const PasswordField = ({
    id,
    label,
    placeholder,
}: Props) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col gap-1">
            <label 
                htmlFor={id}
                className=""
            >
                {label}:
            </label>
            <div className="flex justify-between gap-2">
            <Field 
                name={id} 
                type={showPassword ? "text" : "password"} 
                placeholder={placeholder} 
                className="border border-gray-300 rounded px-3 py-2 flex-1"
            />

                <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="px-3 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                >
                    {showPassword ?  <EyeOpenIcon className="w-5 h-5" /> : <EyeClosedIcon className="w-5 h-5" />}
                </button>
            </div>
            <ErrorMessage
                name={id}
                component="p"
                className="text-red-500 text-xs"
            />
        </div>
    );
};
