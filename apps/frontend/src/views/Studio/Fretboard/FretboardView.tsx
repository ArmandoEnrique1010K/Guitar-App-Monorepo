import { FretNumbers, GuitarNeck, Loader } from '@/components';
import { useFretboard } from '@/hooks';

export const FretboardView = () => {
    const { loadingFretboard } = useFretboard();

    return (
        <div
            className="w-full h-full flex flex-col justify-between min-h-max bg-slate-900 
            bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)]
            bg-size-[4px_4px] border-2 border-t-0 border-l-0 border-r-0 border-b-slate-500"
        >
            <div className="relative flex-1">
                {loadingFretboard ? (
                    <Loader className="w-40" />
                ) : (
                    <GuitarNeck />
                )}
            </div>

            {/* No se van a mostrar los numeros mientras esta cargando el mastil */}
            {loadingFretboard ? (
                <div className="font-bold text-black text-center bg-black">
                    Cargando...
                </div>
            ) : (
                <FretNumbers />
            )}
        </div>
    );
};
