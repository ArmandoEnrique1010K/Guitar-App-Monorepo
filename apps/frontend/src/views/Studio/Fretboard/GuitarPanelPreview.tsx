import { Rope } from '@/components/Studio/Fretboard/old/Rope';
import { neck } from '@/data/neck';

const renderCircle = (chord: number) => {
    if (chord === 12) {
        return (
            <div className="flex xsm:flex-col xsm:gap-16 w-full justify-between">
                <span className="flex items-center justify-center w-5 h-5 bg-[var(--icon-color)] rounded-full text-base text-black"></span>
                <span className="flex items-center justify-center w-5 h-5 bg-[var(--icon-color)] rounded-full text-base text-black"></span>
            </div>
        );
    }
    if (chord === 0) return null;
    if (chord % 3 === 0)
        return (
            <span className="flex items-center justify-center w-5 h-5 bg-[var(--icon-color)] rounded-full text-base text-black"></span>
        );
    return null;
};

export const GuitarPanel = () => {
    const firstRopeFrets = () => {
        if (neck.length > 0) {
            // console.log('MOSTRANDO NECK');

            return neck[0].frets;
        }
        return [];
    };
    // useEffect(() => {
    //     console.log(neck);
    // }, [neck]);

    return (
        <div className="relative">
            <div className="bg-[var(--primary-color-dark)] relative  flex  flex-row-reverse xsm:flex-col">
                {neck.map(({ rope, frets }) => (
                    <Rope key={rope} rope={rope} frets={frets} />
                ))}
                {/* Acordes de la guitarra en una fila */}
                <div
                    className="bg-[var(--menu-bar-button-color)] 
        flex justify-between xsm:w-full w-36 flex-col xsm:flex-row 
        "
                >
                    {firstRopeFrets().map((fret) => (
                        <span
                            className=" flex h-10 xsm:h-full w-full items-center justify-center
            sm:text-base text-sm font-light font-shockwave-2 border-1"
                            key={fret.chord}
                        >
                            {fret.chord}
                        </span>
                    ))}
                </div>

                {/* Circulos en la guitarra */}
                <div className="absolute xsm:w-full w-full xsm:top-[45%] h-full xsm:h-0 xsm:left-[0%] left-[3%] flex flex-col xsm:flex-row justify-around items-center pointer-events-none ">
                    {firstRopeFrets().map((fret) => (
                        <div
                            className="flex items-center justify-around xsm:w-5 w-[37%] h-5 rounded-full
             text-base text-black "
                            key={fret.chord}
                        >
                            {renderCircle(fret.chord)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
