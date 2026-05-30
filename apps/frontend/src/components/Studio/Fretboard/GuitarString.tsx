import type { FretNote } from '@/schemas';
import { FretCell } from './FretCell';

type Props = {
    frets: FretNote[];
};

export const GuitarString = ({ frets }: Props) => {
    return (
        <div className="w-full flex-1 flex items-center gap-1 justify-between">
            {frets.map((fret) => (
                <FretCell
                    key={fret.noteIndex}
                    audioUrl={fret.audioUrl}
                    noteIndex={fret.noteIndex}
                    keyToPress={fret.key}
                />
            ))}
            {/* <FretCell />
            <FretCell />
            <FretCell />
            <FretCell />
            <FretCell />
            <FretCell />
            <FretCell />
            <FretCell />
            <FretCell />
            <FretCell /> */}
        </div>
    );
};
