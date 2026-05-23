import type { ChangeEvent } from 'react';

type Props = {
    label?: string;
    value: number;
    min?: number;
    max?: number;
    disabled?: boolean;
    unit?: string;
    onChange: (value: number) => void;
};

export const DynamicSlider = ({
    label,
    value,
    min = 0,
    max = 100,
    disabled = false,
    unit = '',
    onChange,
}: Props) => {
    const percentage = ((value - min) / (max - min)) * 100;

    const getGlowColor = () => {
        if (percentage < 40) return '#22c55e';
        if (percentage < 75) return '#eab308';

        return '#ef4444';
    };
    const getTrackColor = () => {
        const hue = (percentage * 120) / 100;

        return `hsl(${hue}, 100%, 50%)`;
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value));
    };

    return (
        <div className="flex flex-row gap-1 w-full">
            <div className="flex justify-between items-center">
                {label && (
                    <span className="text-[11px] font-bold uppercase tracking-wide text-gray-300">
                        {label}
                    </span>
                )}
            </div>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={handleChange}
                disabled={disabled}
                className="
        studio-slider
        w-full
        h-2
        appearance-none
        cursor-pointer 
        bg-transparent 
    "
                style={{
                    background: getTrackColor(),
                }}
            />
            <span
                className="text-[10px] font-bold"
                style={{
                    color: getGlowColor(),
                }}
            >
                {value}
            </span>
            <style>
                {`
                    .studio-slider::-webkit-slider-runnable-track{
                        border-radius: 20px;
                        border: 1px solid #111827;
                        height: 12px;    
                        box-shadow:
                            inset 0 1px 2px rgba(0,0,0,0.8),
                            0 0 4px rgba(0,0,0,0.4);
                    }










                    .winamp-slider::-webkit-slider-runnable-track {
                        height: 8px;
                        border-radius: 2px;
                        border: 1px solid #111827;
                        background:
                            linear-gradient(
                                to right,
                                #22c55e 0%,
                                #22c55e 40%,
                                #eab308 70%,
                                #ef4444 100%
                            );
                        box-shadow:
                            inset 0 1px 2px rgba(0,0,0,0.8),
                            0 0 4px rgba(0,0,0,0.4);
                    }

                    .winamp-slider::-webkit-slider-thumb {
                        appearance: none;
                        width: 14px;
                        height: 18px;
                        margin-top: -6px;

                        border-top: 1px solid #d1d5db;
                        border-left: 1px solid #d1d5db;
                        border-right: 1px solid #111827;
                        border-bottom: 1px solid #111827;

                        background:
                            linear-gradient(
                                to bottom,
                                #9ca3af,
                                #4b5563
                            );

                        box-shadow:
                            0 0 6px ${getGlowColor()},
                            inset 0 1px 1px rgba(255,255,255,0.3);

                        cursor: pointer;
                    }

                    .winamp-slider::-moz-range-track {
                        height: 8px;
                        border-radius: 2px;
                        border: 1px solid #111827;
                        background:
                            linear-gradient(
                                to right,
                                #22c55e 0%,
                                #22c55e 40%,
                                #eab308 70%,
                                #ef4444 100%
                            );
                    }

                    .winamp-slider::-moz-range-thumb {
                        width: 14px;
                        height: 18px;
                        border: none;

                        background:
                            linear-gradient(
                                to bottom,
                                #9ca3af,
                                #4b5563
                            );

                        box-shadow:
                            0 0 6px ${getGlowColor()};
                    }
                `}
            </style>
        </div>
    );
};
