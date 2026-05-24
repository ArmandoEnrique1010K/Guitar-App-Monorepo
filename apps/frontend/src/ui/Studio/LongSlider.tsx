import type { ChangeEvent } from 'react';

type Props = {
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
    title?: string;
};

export const LongSlider = ({ value, min, max, onChange, title }: Props) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value));
    };

    return (
        <div className="flex flex-row gap-2 items-center w-full text-xs font-bold uppercase tracking-wide">
            <input
                title={title}
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={handleChange}
                className="
                    long-slider
                    w-full
                    appearance-none
                    cursor-pointer 
                    bg-transparent 
                "
                style={{
                    background: 'oklch(55.4% 0.046 257.417)',
                }}
            />
            <div className="flex flex-row justify-center items-center gap-1">
                <div
                    className="w-8 h-6 flex items-center justify-center text-green-500 bg-black 
                                border-2
                                border-t-slate-900
                                border-l-slate-900
                                border-r-slate-500
                                border-b-slate-500
                "
                >
                    {value}
                </div>
            </div>

            {/* Estilos aplicados dinámicamente a la barra del slider y al boton para arrastrar el slider*/}
            <style>
                {`
                    .long-slider{
                        height: 18px;    
                        box-shadow:
                            inset 0 1px 2px rgba(0,0,0,0.8),
                            0 0 4px rgba(0,0,0,0.4);
                    }


                    .long-slider::-webkit-slider-thumb {
                        appearance: none;
    width: 34px;
    height: 18px;
                        margin-top: 0px;

    border-top: 2px solid #fff7c2;
    border-left: 2px solid #fff7c2;
    border-right: 2px solid #5b5300;
    border-bottom: 2px solid #5b5300;
    background:
        linear-gradient(
            to bottom,
            #fffde8 0%,
            #f7e46a 45%,
            #c6a800 100%
        );

    box-shadow:
        inset 0 1px 1px rgba(255,255,255,0.8),
        inset 0 -1px 1px rgba(0,0,0,0.25),
        0 0 2px rgba(0,0,0,0.5);

    cursor: pointer;

                    }
                `}
            </style>
        </div>
    );
};
