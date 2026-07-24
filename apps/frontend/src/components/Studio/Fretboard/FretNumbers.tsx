import { useSettings } from '@/hooks';

export const FretNumbers = () => {
    const { rootChord, lockOpenString } = useSettings();

    // Debe renderizar los números de los trastes comenzando desde el traste seleccionado hasta los siguientes 10
    // Pero si el acorde inicial esta bloqueado, debe ser los siguientes 9
    const fretNumbers = Array.from(
        { length: lockOpenString ? 10 : 11 },
        (_, i) => rootChord + i,
    );

    return (
        <div
            className="flex flex-row w-full 
                    gap-1 pr-1 lg:pr-2
                    text-sm
                    font-bold
                    text-green-500

            "
        >
            <div className="w-5 lg:w-6"></div>
            {lockOpenString && (
                <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 h-1 bg-green-700" />

                    <span className="shrink-0">0</span>

                    <div className="flex-1 h-1 bg-green-700" />
                </div>
            )}

            {fretNumbers.map((fretNumber) => (
                <div
                    key={fretNumber}
                    className="flex-1 flex items-center gap-2"
                >
                    <div className="flex-1 h-1 bg-green-700" />

                    <span className="shrink-0">{fretNumber}</span>

                    <div className="flex-1 h-1 bg-green-700" />
                </div>
            ))}
        </div>
    );
};
