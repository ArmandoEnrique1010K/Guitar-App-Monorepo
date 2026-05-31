import { useFretboard } from '@/hooks/useFretboard';
import { GuitarString } from './GuitarString';
import { OpenStringLabel } from './OpenStringLabel';

export const GuitarNeck = () => {
    const { neck } = useFretboard();

    const OPEN_STRINGS = [
        {
            value: 'E',
            title: '6° cuerda (grave)',
        },
        {
            value: 'A',
            title: '5° cuerda',
        },
        {
            value: 'D',
            title: '4° cuerda',
        },
        {
            value: 'G',
            title: '3° cuerda',
        },
        {
            value: 'B',
            title: '2° cuerda',
        },
        {
            value: "E'",
            title: '1° cuerda (aguda)',
        },
    ];

    return (
        <div
            className=" 
        w-full
        h-full
        lg:p-2 p-1
        text-white
        flex flex-col flex-1
        gap-1
        "
        >
            {neck.map((string, index) => (
                <div key={index} className="flex flex-row flex-1">
                    <OpenStringLabel
                        value={OPEN_STRINGS[string.stringIndex].value}
                        title={OPEN_STRINGS[string.stringIndex].title}
                    />
                    <GuitarString
                        frets={string.frets}
                        stringIndex={string.stringIndex}
                    />
                </div>
            ))}
        </div>
    );
};
