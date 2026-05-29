import { FretNumbers } from '@/components/Studio/Fretboard/FretNumbers';
import { GuitarNeck } from '@/components/Studio/Fretboard/GuitarNeck';

export const GuitarPanel = () => {
    return (
        <div className="bg-amber-300 h-full w-full flex flex-col justify-between">
            <GuitarNeck />
            <FretNumbers />
        </div>
    );
};
