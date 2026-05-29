import { GuitarString } from './GuitarString';

export const GuitarNeck = () => {
    return (
        //         border
        // border-zinc-700

        <div
            className="
        w-full
        h-full
        bg-zinc-900
        p-2

        bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)]
        bg-size-[4px_4px]

        shadow-[0_0_10px_rgba(0,0,0,0.8)]
        text-white
        flex flex-col flex-1
        gap-2
        "
        >
            <GuitarString />

            <GuitarString />
            <GuitarString />
            <GuitarString />
            <GuitarString />
            <GuitarString />
        </div>
    );
};
