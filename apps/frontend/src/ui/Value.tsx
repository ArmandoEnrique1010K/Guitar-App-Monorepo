import { useEffect, useState, type ChangeEvent } from 'react';

type Props = {
    value: number;
    min: number;
    max: number;
    disabled?: boolean;
    onChange: (value: number) => void;
    decimals?: number;
};

export const Value = ({
    value,
    min,
    max,
    disabled = false,
    onChange,
    decimals = 0,
}: Props) => {
    const [inputValue, setInputValue] = useState(value.toString());
    // Sincroniza el estado local cuando cambia el valor desde el padre
    useEffect(() => {
        setInputValue(value.toString());
    }, [value]);

    // Expresion regular segun el numero de decimales
    const regex =
        decimals === 0 ? /^\d*$/ : new RegExp(`^\\d*\\.?\\d{0,${decimals}}$`);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;

        if (text === '') {
            setInputValue('');
            return;
        }

        // Solo números
        // if (!/^\d+$/.test(text)) {
        //     return;
        // }

        // Números y decimales
        // if (!/^\d*\.?\d*$/.test(text)) {
        //     return;
        // }

        // Números y decimales a 2 cifras decimales como maximo
        // if (!/^\d*\.?\d{0,2}$/.test(text)) {
        //     return;
        // }

        if (!regex.test(text)) {
            return;
        }

        // setInputValue(text);
        const newValue = Number(text);

        // No permitir valores mayores al máximo
        if (newValue > max) {
            return;
        }

        setInputValue(text);
    };

    const handleBlur = () => {
        // let newValue = Number(inputValue);

        // if (Number.isNaN(newValue)) {
        //     newValue = min;
        // }

        // newValue = Math.max(min, Math.min(max, newValue));

        // setInputValue(newValue.toString());
        // onChange(newValue);
        let newValue = Number(inputValue);

        if (Number.isNaN(newValue)) {
            newValue = min;
        }

        newValue = Math.max(min, Math.min(max, newValue));

        setInputValue(newValue.toString());

        onChange(newValue);
    };
    return (
        <input
            type="text"
            // TODO BUG: Por alguna razon no funciona selection:bg-blue-500
            className={`w-12 h-6  flex items-center justify-center text-green-500 bg-black text-center
                                border-2
                                border-t-slate-900
                                border-l-slate-900
                                border-r-slate-500
                                border-b-slate-500
                                focus:outline-none
                                focus:ring-0

        
        ${disabled ? '' : 'selection:text-white'}
                                 

                `}
            value={inputValue}
            min={min}
            max={max}
            disabled={disabled}
            // onChange={(e) => {
            //     handleChange(e);
            //     e.target.blur();
            // }}

            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={(e) => e.currentTarget.select()}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.currentTarget.blur();
                }
            }}
            // Al hacer clic se selecciona todo el texto escrito en el
            // onClick={(e) => {
            //     e.currentTarget.select();
            // }}
            tabIndex={-1}
        />
    );
};
