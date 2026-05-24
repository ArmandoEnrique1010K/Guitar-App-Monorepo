import { usePreferences } from '@/hooks/usePreferences';
import { SelectOptionButton } from '@/ui/Studio/SelectOptionButton';

export const GuitarButton = () => {
    const { selectedGuitar, guitarsList, changeSelectedGuitar } =
        usePreferences();

    const handleChange = (value: string) => {
        const guitar = guitarsList.find((guitar) => guitar.name === value);
        if (guitar) {
            changeSelectedGuitar(guitar);
        }
    };

    return (
        <>
            <SelectOptionButton
                value={selectedGuitar?.name || ''}
                options={guitarsList.map((guitar) => guitar.name)}
                onChange={handleChange}
                title="Cambie la guitarra seleccionada"
            />
        </>
    );
};
