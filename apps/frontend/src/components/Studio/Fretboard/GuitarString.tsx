import type { FretNote } from '@/schemas';
import { FretCell } from './FretCell';

type Props = {
    frets: FretNote[];
    stringIndex: number;
};

export const GuitarString = ({ frets, stringIndex }: Props) => {
    return (
        <div className="w-full flex-1 flex items-center gap-1 justify-between relative z-10">
            {frets.map((fret) => (
                <FretCell
                    key={fret.noteIndex}
                    noteIndex={fret.noteIndex}
                    keyToPress={fret.key?.code}
                    keyToShow={fret.key?.label}
                    stringIndex={stringIndex}
                />
            ))}
        </div>
    );
};
