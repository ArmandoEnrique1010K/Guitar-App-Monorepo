import { useState } from 'react';

type ChordViewProps = {
    chord: number;
    rope: number;
    keyFromKeyboard: string;
    file: string;
};

export const Chord = ({
    chord,
    rope,
    keyFromKeyboard,
    file,
}: ChordViewProps) => {
    // const {
    //     activeInstrument,
    //     noteConfig,
    //     currentNote,
    //     pulseMode,
    //     volume,
    //     previousNote,
    //     effects,
    //     playSound,
    //     stopAllInstances,
    //     stopRepeatingNote,
    //     // playNote,
    //     playSoundModeOnKeyboard,
    // } = useGuitar();

    // Agrega este estado al componente
    const [keyPressed, setKeyPressed] = useState(false);

    const [isActive, setIsActive] = useState(false);

    // TODO: ESTO DEBERIA ESTAR EN EL CONTEXTO GLOBAL
    // useEffect(() => {
    //   soundFileRef.current = new Wad({
    //     source: `audio/${activeInstrument.name}/${file}.mp3`,
    //     volume: volume,
    //   });
    // }, [activeInstrument, file, volume]);

    // Pintar el acorde cuando el usuario lo toque con el teclado o con el mouse

    // const handleStopSound = () => {
    //     stopAllInstances();
    //     if (noteConfig.enableRepeatNote) stopRepeatingNote(rope, chord);
    // };

    // Teclado: activa/desactiva el acorde visualmente
    // useEffect(() => {
    //     window.addEventListener('keydown', handleKeyDown);
    //     window.addEventListener('keyup', handleKeyUp);

    //     return () => {
    //         window.removeEventListener('keydown', handleKeyDown);
    //         window.removeEventListener('keyup', handleKeyUp);
    //     };
    // }, [
    //     keyFromKeyboard,
    //     pulseMode,
    //     volume,
    //     noteConfig,
    //     activeInstrument,
    //     effects,
    //     currentNote,
    //     previousNote,
    //     keyPressed,
    //     playSoundModeOnKeyboard,
    // ]);

    // Mouse: activa/desactiva el acorde visualmente
    // const handleMouseDown = () => {
    //     setIsActive(true);
    // };
    // const handleMouseUp = () => {
    //     setIsActive(false);

    //     if (pulseMode) handleStopSound();
    //     if (noteConfig.enableRepeatNote) stopRepeatingNote(rope, chord);
    // };

    // Si el mouse sale del botón, desactiva el estilo
    // const handleMouseLeave = () => {
    //     setIsActive(false);
    // };

    // const handleKeyDown = (event: KeyboardEvent) => {
    //     if (
    //         event.key === keyFromKeyboard &&
    //         !keyPressed &&
    //         playSoundModeOnKeyboard
    //     ) {
    //         setKeyPressed(true);
    //         setIsActive(true);

    //         playSound(rope, chord, file);
    //     }
    // };

    // const handleKeyUp = (event: KeyboardEvent) => {
    //     if (event.key === keyFromKeyboard) {
    //         setKeyPressed(false);
    //         setIsActive(false);
    //         if (pulseMode) handleStopSound();
    //         if (noteConfig.enableRepeatNote) stopRepeatingNote(rope, chord);
    //     }
    // };
    return (
        <button
            className={` ${isActive ? 'bg-[var(--range-color)]' : 'hover:bg-[var(--primary-color)]'} ${
                chord === 0
                    ? 'flex-1 text-center text-black border text-base sm:text-lg font-semibold border-solid border-black bg-[var(--icon-color)] h-10 outline-0'
                    : 'flex-1 text-center text-black border text-base sm:text-lg font-semibold border-solid border-black h-10 outline-0'
            }`}
            // onMouseDown={handleMouseDown}
            // onMouseUp={handleMouseUp}
            // onMouseLeave={handleMouseLeave}
            tabIndex={-1}
        >
            {keyFromKeyboard === 'Dead'
                ? '´'
                : keyFromKeyboard === 'Shift'
                  ? '⇧'
                  : keyFromKeyboard}
        </button>
    );
};
