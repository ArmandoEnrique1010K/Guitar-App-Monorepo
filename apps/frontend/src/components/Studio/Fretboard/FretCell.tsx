import React from 'react';

export const FretCell = () => {
    return (
        <div
            className="
                    h-full
                    flex
                    items-center
                    justify-center

                    bg-black
                    text-green-400
                    text-[11px]
                    uppercase
                    font-bold
                    tracking-widest
                    w-full
                    border
                    border-zinc-700

                    shadow-[0_0_4px_rgba(74,222,128,0.35)]

                    cursor-pointer
                    active:cursor-grabbing

                    hover:bg-zinc-800
                    transition-all
                "
        >
            0
        </div>
    );
};
