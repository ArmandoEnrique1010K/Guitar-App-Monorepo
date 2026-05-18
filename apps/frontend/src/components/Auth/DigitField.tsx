import { PinInput } from '@ark-ui/react/pin-input';

type Props = {
    index: number;
};

export const DigitField = ({ index }: Props) => {
    return (
        <PinInput.Input
            index={index}
            className="sm:size-12 size-10 text-center text-lg border-gray-300 border rounded-md"
            placeholder=""
        />
    );
};
