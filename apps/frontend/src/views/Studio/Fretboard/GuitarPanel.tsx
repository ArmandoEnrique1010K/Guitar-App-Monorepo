import { FretNumbers } from '@/components/Studio/Fretboard/FretNumbers';
import { GuitarNeck } from '@/components/Studio/Fretboard/GuitarNeck';

// Tipado para las notas de la guitarra que se asignaran

export const GuitarPanel = () => {
    return (
        <div
            className=" w-full h-full flex flex-col justify-between min-h-max

            bg-slate-900
                bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)]
        bg-size-[4px_4px]
        
        border-2
                    border-t-0
                    border-l-0
                    border-r-0
                    border-b-slate-500
        "
        >
            <GuitarNeck />
            <FretNumbers />
            {/* <div className="text-white">{JSON.stringify(guitars)}</div> */}
        </div>
    );
};
