import { useMediaQuery } from 'react-responsive';
import Pause from '@/icons/Pause.svg';

export const PauseButton = () => {
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
                text-black

                active:from-gray-400
                active:to-gray-500
                active:border-t-gray-800
                active:border-l-gray-800
                active:border-r-gray-200
                active:border-b-gray-200
                active:text-white


            `}
            onClick={() => {}}
            title={'Silencia todas las notas reproducidas'}
        >
            {isMobile ? (
                <img src={Pause} alt="Pause" className="w-6 h-6" />
            ) : (
                <>
                    <span className="text-xs w-18 h-12 flex items-center">
                        Silenciar todo
                    </span>
                </>
            )}
        </button>
    );
};
