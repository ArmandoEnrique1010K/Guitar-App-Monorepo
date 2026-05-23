import { PinInput } from '@chakra-ui/react';
import { ErrorMessage, useFormikContext } from 'formik';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

type Props = {
    id: string;
    label: string;
    onChange?: (value: string) => void;
};

export const DigitsGroupField = ({ id, label, onChange }: Props) => {
    const [value, setValue] = useState<string[]>([]);
    const { setFieldValue } = useFormikContext();

    // TODO: ¿ES POSIBLE MODIFICAR EL CODIGO PARA QUE NO UTILIZAR 'setFieldValue'?
    const handleValueChange = (details: PinInput.ValueChangeDetails) => {
        setValue(details.value);

        onChange?.(details.value.join(''));
        setFieldValue(id, details.value.join(''));
    };

    const isMobile = useMediaQuery({ query: '(max-width: 639px)' });
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
                    value={value}
                    onValueChange={handleValueChange}
                    size={isMobile ? 'lg' : 'xl'}
                >
                    <PinInput.HiddenInput />

                    <PinInput.Control>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <PinInput.Input key={index} index={index} />
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
