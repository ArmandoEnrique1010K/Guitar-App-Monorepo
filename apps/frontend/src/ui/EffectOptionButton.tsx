import { TriangleDownIcon } from '@radix-ui/react-icons';
type Option = {
    value: string;
    label: string;
};
type Props = {
    placeholder?: string;
    options: Option[];
    onChange: (value: string) => void;
    title?: string;
};

export const EffectOptionButton = ({
    placeholder = 'Agregar efecto',
    options,
    onChange,
    title,
}: Props) => {
    return (
        <div
            className="
                relative
                flex
                items-center

                border-2
                uppercase
                font-bold
                tracking-wide
                select-none

                bg-linear-to-b
                from-gray-300
                to-gray-400

                border-t-gray-200
                border-l-gray-200
                border-r-gray-800
                border-b-gray-800

                shadow-inner
                text-black
            "
            title={title}
        >
            <select
                title="Agregue un efecto de sonido a la cadena de efectos"
                onChange={(e) => {
                    onChange(e.target.value);

                    // Evita que el select mantenga el foco después de seleccionar
                    // Al pulsar una tecla ya no va a seleccionar otra opción
                    e.target.blur();
                }}
                className="
                    absolute
                    inset-0
                    opacity-0
                    cursor-pointer
                    z-10
                    w-full
                    h-full
                "
            >
                {options.length === 0 ? (
                    <option value="">No hay efectos disponibles</option>
                ) : (
                    <option value="">Seleccione un efecto</option>
                )}

                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            <div
                className="
                    flex
                    flex-row
                    items-center
                    justify-between

                    w-full

                    px-2
                    py-1

                    pointer-events-none
                "
            >
                <span className="text-xs flex-1 text-left">{placeholder}</span>

                <div className="border-l border-l-gray-700 pl-1 sm:flex hidden">
                    <TriangleDownIcon className="size-5" />
                </div>
            </div>
        </div>
    );
};
