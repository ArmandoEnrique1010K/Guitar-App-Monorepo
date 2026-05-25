import React from 'react';
import clsx from 'clsx';

type Props = {
    text?: string;
    onClick: () => void;
    icon?: React.ReactNode;
    title?: string;
    selected?: boolean;
};

export const LatchButton = ({
    text,
    onClick,
    icon,
    title,
    selected = false,
}: Props) => {
    return (
        <>
            <div className="hidden border-r-gray-200 border-b-gray-100"></div>
            <button
                className={clsx(
                    `
                flex items-center sm:gap-2 gap-1
                sm:px-3 sm:py-1 px-1 py-0.5
                border-4 border-solid
                uppercase
                font-bold
                tracking-wide
                select-none
                bg-linear-to-b from-gray-300 to-gray-400
                border-t-gray-200
                border-l-gray-200
                border-r-gray-800
                border-b-gray-800
                shadow-inner

                active:from-gray-400
                active:to-gray-500
                active:border-t-gray-800
                active:border-l-gray-800
                active:border-r-gray-200
                active:border-b-gray-200
                active:drop-shadow(0 0 4px #4ade80)

                text-slate-600 
                active:text-slate-800  `,

                    selected &&
                        `
            from-gray-400
            to-gray-500

            border-t-slate-800
            border-l-slate-800
            border-r-slate-200
            border-b-slate-200
            text-slate-800

        `,
                )}
                // SOLUCION TEMPORAL, USAR EL COLOR SLATE EN LUGAR DE GRAY PARA LOS BORDES (CASI NO HAY DIFERENCIA VISUAL)
                onClick={onClick}
                title={title}
            >
                {icon} {text}
            </button>
        </>
    );
};
