import { useMediaQuery } from 'react-responsive';

type Props = {
    text: string;
    value: boolean;
    onClick: () => void;
    title?: string;
    icon: React.ReactNode;
};

export const SwitchButton = ({ text, value, onClick, title, icon }: Props) => {
    // TODO: EL TAMAÑO PODRIA CAMBIAR EN EL FUTURO
    const isMobile = useMediaQuery({ maxWidth: 639.999 });

    return (
        <button
            className={`
                flex items-center gap-2
                px-2 py-1
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

                active:from-gray-400
                active:to-gray-500
                active:border-t-gray-800
                active:border-l-gray-800
                active:border-r-gray-200
                active:border-b-gray-200

                
                text-slate-600 
                active:text-slate-800  
                active:drop-shadow(0 0 4px #4ade80)

            `}
            // El color de texto sirve para aplicarle color de fondo al icono
            // porque el icono usa currentColor

            onClick={onClick}
            title={title}
        >
            <div
                className={`
                    size-3
                    ${
                        value
                            ? 'bg-green-400 border border-t-gray-800 border-l-gray-800 border-r-gray-200 border-b-gray-200'
                            : 'bg-green-800 border border-t-gray-800 border-l-gray-800 border-r-gray-200 border-b-gray-200'
                    }
                `}
            />

            {isMobile ? (
                icon
            ) : (
                <>
                    <span className="text-xs w-18 h-12 flex items-center">
                        {text}
                    </span>
                </>
            )}
        </button>
    );
};
