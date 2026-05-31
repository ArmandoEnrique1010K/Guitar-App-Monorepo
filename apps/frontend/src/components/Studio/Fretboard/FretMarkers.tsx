import { useControlBar } from '@/hooks/useControlBar';

const REAL_MARKERS = [3, 5, 7, 9, 12, 15, 17, 19, 21];

export const FretMarkers = () => {
    // rootChord es el acorde inicial en el que empezara
    const { rootChord, lockOpenString } = useControlBar();

    const visibleFrets = Array.from(
        { length: lockOpenString ? 10 : 11 },
        (_, i) => rootChord + i,
    );

    const columns: (number | 'OPEN')[] = lockOpenString
        ? ['OPEN', ...visibleFrets]
        : visibleFrets;

    return (
        <>
            <div
                className={`absolute ${lockOpenString ? '' : ''} inset-0 pointer-events-none  
                z-0
                left-5
                lg:p-2 p-1`}
            >
                <div className="flex h-full">
                    {columns.map((column, index) => {
                        const isOpenColumn =
                            (lockOpenString && column === 'OPEN') ||
                            (!lockOpenString && index === 0);

                        const fretNumber =
                            typeof column === 'number' ? column : null;

                        const isMarker =
                            fretNumber !== null &&
                            REAL_MARKERS.includes(fretNumber);

                        const isDoubleMarker = fretNumber === 12;

                        return (
                            <div
                                key={`${column}-${index}`}
                                className="flex-1 flex justify-center items-center"
                            >
                                {/* CEJUELA / ACORDE ABIERTO */}
                                {isOpenColumn && (
                                    <div className=" w-full h-full bg-gray-200/50 " />
                                )}

                                {/* MARCADOR DOBLE */}
                                {!isOpenColumn && isDoubleMarker && (
                                    <div className="flex flex-col justify-evenly items-center h-full">
                                        <div className="size-16 rounded-full bg-gray-200/50" />
                                        <div className="size-16 rounded-full bg-gray-200/50" />
                                    </div>
                                )}

                                {/* MARCADOR SIMPLE */}
                                {!isOpenColumn &&
                                    isMarker &&
                                    !isDoubleMarker && (
                                        <div className="size-16 rounded-full bg-gray-200/50" />
                                    )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};
