import { PinInput } from '@chakra-ui/react';
import { ErrorMessage } from 'formik';
import { useState } from 'react';

type Props = {
    id: string;
    label: string;
    onChange?: (value: string) => void;
};

export const DigitsGroupFieldChakra = ({ id, label, onChange }: Props) => {
    const [value, setValue] = useState<string[]>([]);

    const handleValueChange = (details: PinInput.ValueChangeDetails) => {
        setValue(details.value);

        onChange?.(details.value.join(''));
        console.log(details.value.join(''));
    };

    return (
        <div className="flex flex-col gap-6">
            <label
                htmlFor={id}
                className="text-sm text-left w-full sm:max-w-md"
            >
                {label}:
            </label>

            <div className="flex flex-col items-center gap-1">
                <PinInput.Root
                    id={id}
                    value={value.join('')}
                    onValueChange={handleValueChange}
                >
                    <PinInput.HiddenInput />

                    <PinInput.Control className="flex gap-2">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <PinInput.Input
                                key={index}
                                index={index}
                                className="w-12 h-12 rounded-lg border border-gray-300 text-center text-lg focus:border-blue-500 focus:outline-none"
                            />
                        ))}
                    </PinInput.Control>
                </PinInput.Root>

                <div className="h-4">
                    <ErrorMessage
                        name={id}
                        component="p"
                        className="text-xs text-red-500"
                    />
                </div>
            </div>
        </div>
    );
};
