import type { ChangeEvent } from 'react';

type Props = {
    label?: string;
    value: number;
    min?: number;
    max?: number;
    disabled?: boolean;
    unit?: string;
    step?: number;
    onChange: (value: number) => void;
    formatedValue?: number;
};

export const HorizontalSlider = ({
    label,
    value,
    min = 0,
    max = 100,
    disabled = false,
    unit = '',
    step = 1,
    onChange,
    formatedValue,
}: Props) => {
    const percentage = ((value - min) / (max - min)) * 100;

    // Calcula el color del track basado en el porcentaje, donde 100% es rojo y 0% es verde, 50% es amarillo
    const getTrackColor = () => {
        const hue = ((100 - percentage) * 120) / 100;
        return `hsl(${hue}, 100%, 50%)`;
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value));
    };

    return (
        <div
            className={`${disabled ? 'opacity-50 cursor-not-allowed' : ''} flex flex-row gap-2 items-center w-full text-xs font-bold uppercase tracking-wide`}
        >
            {label && (
                <div className="flex justify-between items-center">
                    {<span className="text-green-500">{label}</span>}
                </div>
            )}
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                disabled={disabled}
                className={`
                    studio-slider
                    w-full
                    h-2
                    appearance-none
                    bg-transparent 
                `}
                style={{
                    // Aplica el cursor según si está deshabilitado o no
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    background: getTrackColor(),
                }}
            />
            <div className="flex flex-row justify-center items-center gap-1">
                <div
                    className="w-10 h-6 flex items-center justify-center text-green-500 bg-black 
                                border-2
                                border-t-slate-900
                                border-l-slate-900
                                border-r-slate-500
                                border-b-slate-500
                "
                >
                    {formatedValue !== undefined ? formatedValue : value}
                </div>
                {unit && (
                    <>
                        <div className="text-green-500">{unit}</div>
                    </>
                )}
            </div>

            {/* Estilos aplicados dinámicamente a la barra del slider y al boton para arrastrar el slider*/}
            <style>
                {`
                    .studio-slider{
                        border-radius: 20px;
                        height: 8px;    
                        box-shadow:
                            inset 0 1px 2px rgba(0,0,0,0.8),
                            0 0 4px rgba(0,0,0,0.4);
                    }


                    .studio-slider::-webkit-slider-thumb {
                        appearance: none;
                        width: 22px;
                        height: 18px;
                        margin-top: 0px;

                        border-top: 2px solid #d1d5db;
                        border-left: 2px solid #d1d5db;
                        border-right: 2px solid #111827;
                        border-bottom: 2px solid #111827;

                        background:
                            linear-gradient(
                                to bottom,
                                #9ca3af,
                                #4b5563
                            );

                    }
                `}
            </style>
        </div>
    );
};
