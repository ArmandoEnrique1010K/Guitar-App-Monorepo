type Props = {
    text: string;
    onClick: () => void;
    title?: string;
    icon: React.ReactNode;
    disabled?: boolean;
    isKeyPressed?: boolean;
    type?: 'button' | 'submit';
};

export const Button = ({
    text,
    onClick,
    title,
    icon,
    disabled = false,
    isKeyPressed = false,
    type,
}: Props) => {
    return (
        <button
            className={`
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                flex items-center sm:gap-2 gap-1
                sm:px-2 sm:py-1 px-1 py-0.5
                border-2
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

                ${
                    !disabled &&
                    `active:from-gray-400 active:to-gray-500 
                    active:border-t-gray-800 active:border-l-gray-800 active:border-r-gray-200 active:border-b-gray-200
                    active:text-slate-800  
                    `
                }

                
                ${
                    isKeyPressed &&
                    `from-gray-400 to-gray-500
                    
                    border-t-gray-800 border-l-gray-800 border-r-slate-200 border-b-slate-200
                    text-slate-800  
                    `
                }
                


                text-slate-600 
                active:drop-shadow(0 0 4px #4ade80)
            `}
            // TODO: REPORTAR UN BUG CUANDO USO border-r-gray-200 Y border-b-gray-200 PARA APLICAR ESITLOS CUANDO SE PULSA EL BOTON
            // CON UNA TECLA, NO APLICA EL ESTILO, ES POR ELLO QUE LO HE SUSTITUIDO CON border-r-slate-200 Y border-b-slate-200

            // El color de texto sirve para aplicarle color de fondo al icono
            // porque el icono usa currentColor

            onClick={(e) => {
                onClick();
                e.currentTarget.blur();
            }}
            tabIndex={-1}
            title={title}
            disabled={disabled}
            type={type}
        >
            {icon}
        </button>
    );
};
