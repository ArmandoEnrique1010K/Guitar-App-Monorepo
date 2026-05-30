import { GuitarString } from './GuitarString';
import { OpenStringLabel } from './OpenStringLabel';

export const GuitarNeck = () => {
    return (
        //         border
        // border-zinc-700
        // bg-zinc-900
        // bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)]
        // bg-size-[4px_4px]
        // shadow-[0_0_10px_rgba(0,0,0,0.8)]
        // h-full

        <div
            className="
        w-full
        lg:p-2 p-1


        text-white
        flex flex-col flex-1
        gap-1
        
        "
        >
            <div className="flex flex-row flex-1">
                <OpenStringLabel value="E" />
                <GuitarString />
            </div>
            <div className="flex flex-row flex-1">
                <OpenStringLabel value="B" />
                <GuitarString />
            </div>
            <div className="flex flex-row flex-1">
                <OpenStringLabel value="G" />
                <GuitarString />
            </div>
            <div className="flex flex-row flex-1">
                <OpenStringLabel value="D" />
                <GuitarString />
            </div>
            <div className="flex flex-row flex-1">
                <OpenStringLabel value="A" />
                <GuitarString />
            </div>
            <div className="flex flex-row flex-1">
                <OpenStringLabel value="E" />
                <GuitarString />
            </div>
        </div>
    );
};
