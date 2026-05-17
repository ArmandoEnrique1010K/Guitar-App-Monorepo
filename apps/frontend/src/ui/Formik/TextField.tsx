import { ErrorMessage, Field } from 'formik';

type Props = {
    id: string;
    label: string;
    placeholder?: string;
    type: 'text' | 'email' | 'number' | 'hidden' | 'password';
};

export const TextField = ({ id, label, placeholder, type = 'text' }: Props) => {
    return (
        <div className="flex flex-col gap-0.5">
            <label htmlFor={id} className="text-sm">
                {label}:
            </label>
            <Field
                name={id}
                type={type}
                placeholder={placeholder}
                className="border border-gray-300 rounded px-3 py-2 "
            />
            <div className="h-4">
                <ErrorMessage
                    name={id}
                    component="p"
                    className="text-red-500 text-xs "
                />
            </div>
        </div>
    );
};
