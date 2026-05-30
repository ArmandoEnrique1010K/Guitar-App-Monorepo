import { useControlBar } from '@/hooks/useControlBar';

export const FretNumbers = () => {
    const { rootChord, lockOpenString } = useControlBar();

    // Debe renderizar los números de los trastes comenzando desde el traste seleccionado hasta los siguientes 10
    // Pero si el acorde inicial esta bloqueado, debe ser los siguientes 9
    const fretNumbers = Array.from(
        { length: lockOpenString ? 10 : 11 },
        (_, i) => rootChord + i,
    );

    return (
        <div
            // className="flex flex-row w-full bg-orange-500"

            // bg-slate-600
            //         bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)]
            //         bg-size-[4px_4px]

            // border-t-2 border-b-2

            className="flex flex-row w-full 
            
                    gap-2 px-2
                    text-sm
                    text-green-500

            "
        >
            <div className="w-3"></div>
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
