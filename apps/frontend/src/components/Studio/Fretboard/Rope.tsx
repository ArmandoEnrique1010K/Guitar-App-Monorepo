import type { Frets } from '@/schemas';
import { Chord } from './Chord';
type RopeViewProps = {
    rope: number;
    frets: Frets;
};

export const Rope = ({ rope, frets }: RopeViewProps) => {
    return (
        <>
            <div className="flex justify-between w-full flex-col xsm:flex-row">
                {frets.map(({ chord, key: keyFromKeyboard, file }) => (
                    // No se puede colocar fragmentos (<></>) dentro de un map, porque causaria un error.
                    <Chord
                        key={`${rope}-${chord}`}
                        chord={chord}
                        rope={rope}
                        keyFromKeyboard={keyFromKeyboard || ''}
                        file={file}
                    />
                ))}
            </div>
        </>
    );
};
