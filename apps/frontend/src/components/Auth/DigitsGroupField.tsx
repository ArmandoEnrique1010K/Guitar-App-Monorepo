import { PinInput } from '@ark-ui/react/pin-input';
import { DigitField } from './DigitField';
import { ErrorMessage, useField } from 'formik';

type Props = {
    id: string;
    label: string;
    onChange?: (value: string) => void;
};

// Campo para introducir un token de 6 digitos
export const DigitsGroupField = ({ id, label, onChange }: Props) => {
    const [field, , helpers] = useField<string>(id);
    const pinValue =
        typeof field.value === 'string'
            ? field.value.split('').concat(Array(6).fill('')).slice(0, 6)
            : Array(6).fill('');
    return (
        <PinInput.Root
            otp
            value={pinValue}
            onValueChange={(details) => {
                helpers.setValue(details.value.join(''));
                onChange?.(details.value.join(''));
            }}
        >
            {' '}
            <PinInput.HiddenInput />
            <div className="flex flex-col gap-6">
                <label className="text-sm text-justify w-full sm:max-w-md max-w-full">
                    {label}:
                </label>

                <div className="flex flex-col gap-0.5 justify-center items-center">
                    <PinInput.Control className="flex sm:gap-3 gap-2">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                            <DigitField key={index} index={index} />
                        ))}
                    </PinInput.Control>

                    <div className="h-4 ">
                        <ErrorMessage
                            name={id}
                            component="p"
                            className="text-red-500 text-xs"
                        />
                    </div>
                </div>
            </div>
        </PinInput.Root>
    );
};
