import { SelectOptionButton } from '@/ui/Studio/SelectOptionButton';
import { useState } from 'react';

export const GuitarButton = () => {
    const [guitarType, setGuitarType] = useState('Clean Solo');

    return (
        <>
            <SelectOptionButton
                value={guitarType}
                options={['Clean Solo', 'Distortion Solo', 'Acoustic']}
                onChange={(value) => setGuitarType(value)}
                title="Cambie el tipo de sonido"
            />
        </>
    );
};
