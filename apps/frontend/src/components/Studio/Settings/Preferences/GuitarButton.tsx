import { usePreferences } from '@/hooks';
import { OptionButton } from '@/ui';

export const GuitarButton = () => {
    const { selectedGuitar, guitars, setSelectedGuitar } = usePreferences();

    const handleChange = (value: string) => {
        const guitar = guitars.find((guitar) => guitar.name === value);
        if (guitar) {
            setSelectedGuitar(guitar);
        }
    };

    return (
        <>
            <OptionButton
                value={selectedGuitar?.name || ''}
                options={guitars.map((guitar) => guitar.name)}
                onChange={handleChange}
                title="Cambie la guitarra seleccionada"
            />
        </>
    );
};
