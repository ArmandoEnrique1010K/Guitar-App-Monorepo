import { MenuNavbar } from '@/views/Studio/Header/MenuNavbar';
import { Outlet } from 'react-router-dom';
import { useControlBar } from '@/hooks/useControlBar';
import { useFretboard } from '@/hooks/useFretboard';
import { usePreferences } from '@/hooks/usePreferences';
import type { GuitarNotes } from '@/schemas';
import { assignKeysToFrets } from '@/utils/assignKeysToFrets';
import { useEffect, useMemo } from 'react';

export const StudioLayout = () => {
    const { loadGuitars, selectedGuitar, stringOrder } = usePreferences();
    const { loadNoteSamples, noteSamples, initializePlayers, setNeck } =
        useFretboard();
    const { lockOpenString, rootChord } = useControlBar();

    // CARGA INICIAL DE NOTAS DE LA GUITARRA
    // 1. Debe llamar a la API REST para obtener las notas de la guitarra
    // loadNoteSamples es la función, ya se llama des de el componente "StudioPage"

    // useEffect(() => {
    //     if (noteSamples) {
    //         console.log(noteSamples);
    //     }
    // }, [noteSamples]);
    // Tipado de noteSamples: {
    //     _id: string;
    //     noteIndex: number;
    //     audioUrl: string;
    // }[]

    // 2. Debe asignar las notas a las cuerdas en el orden especificado
    // Para aquello se tendra que construir otro arreglo de objetos que devuelva el tipado de GuitarNotes
    // Una cuerda de guitarra tiene 22 notas, se sigue la siguiente logica
    // Cuerda 1 (más gruesa)   noteIndex: 0 1 2 3 4 5 6 ... 22
    // Cuerda 2                noteIndex: 5 6 7 8 9 10 11 ... 27
    // Cuerda 3                noteIndex: 10 11 12 13 14 15 16 ... 32
    // Cuerda 4                noteIndex: 15 16 17 18 19 20 21 ... 37
    // Cuerda 5                noteIndex: 19 20 21 22 23 24 25 ... 41
    // Cuerda 6 (más delgada)  noteIndex: 24 25 26 27 28 29 30 ... 46

    const guitarNotes: GuitarNotes = useMemo(() => {
        if (!noteSamples.length) return [];

        const STRING_STARTS = [0, 5, 10, 15, 19, 24];

        const noteMap = new Map(
            noteSamples.map((note) => [note.noteIndex, note]),
        );

        return STRING_STARTS.map((startIndex, stringIndex) => ({
            stringIndex: stringIndex,

            frets: Array.from({ length: 23 }, (_, fret) => {
                const noteIndex = startIndex + fret;

                const sample = noteMap.get(noteIndex);

                return {
                    noteIndex,
                    audioUrl: sample?.audioUrl ?? '',
                };
            }),
        }));
    }, [noteSamples]);

    // useEffect(() => {
    //     console.log(guitarNotes);
    // }, [guitarNotes]);

    // 3. Debe asignar las notas a los trastes
    // La función de utilidad assignKeysToFrets es la encargada de hacer eso
    const newNeck = useMemo(() => {
        const reversed = stringOrder.slice();

        const keys = assignKeysToFrets(
            guitarNotes,
            reversed[0],
            reversed[1],
            reversed[2],
            reversed[3],
            reversed[4],
            reversed[5],
            rootChord,
            lockOpenString,
        );
        return keys;
    }, [guitarNotes, stringOrder, rootChord, lockOpenString]);

    useEffect(() => {
        setNeck(newNeck);
        // console.log(newNeck);
    }, [newNeck, setNeck]);

    // AQUI DEBE CARGARSE LOS EFECTOS SECUNDARIOS PORQUE ES EL COMPONENTE CONTENEDOR
    useEffect(() => {
        loadGuitars();
    }, [loadGuitars]);

    useEffect(() => {
        if (!selectedGuitar?._id) return;

        loadNoteSamples(selectedGuitar._id);
    }, [selectedGuitar?._id, loadNoteSamples]);

    useEffect(() => {
        if (!noteSamples.length) return;

        initializePlayers(noteSamples);
    }, [noteSamples]);
    // "NoteSamples" contiene los datos de las notas
    // const urls = Object.fromEntries(
    //     noteSamples.map((noteSample) => [
    //         noteSample.noteIndex,
    //         noteSample.audioUrl,
    //     ]),
    // );

    // const players = new Tone.Players(urls).toDestination();
    // await Tone.loaded();

    // useEffect(() => {
    //     if (noteSamples.length === 0) return;

    //     const initialize = async () => {
    //         players?.dispose();

    //         const urls = Object.fromEntries(
    //             noteSamples.map((sample) => [
    //                 sample.noteIndex,
    //                 sample.audioUrl,
    //             ]),
    //         );

    //         setPlayers(new Tone.Players(urls));

    //         await Tone.loaded();

    //         players.toDestination();
    //     };

    //     initialize();

    //     return () => {
    //         players?.dispose();
    //     };
    // }, [noteSamples, players, setPlayers]);

    return (
        <>
            <div className="flex flex-col h-screen">
                <MenuNavbar />
                {/* TODO: DEBE GUARDAR LA SESION ACTUAL DEL USUARIO EN ZUSTAND */}
                <div className="w-full flex-1 min-h-0">
                    <Outlet />
                </div>
            </div>
        </>
    );
};
