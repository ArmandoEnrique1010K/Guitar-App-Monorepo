import { usePreferences } from '@/hooks';
import { ActionMenu } from '@/components';
import { TriangleDownIcon } from '@radix-ui/react-icons';

export const GuitarButton = () => {
    const { selectedGuitar, guitars, setSelectedGuitar } = usePreferences();

    // const handleChange = (value: string) => {
    //     const guitar = guitars.find((guitar) => guitar.name === value);
    //     if (guitar) {
    //         setSelectedGuitar(guitar);
    //     }
    // };

    return (
        <>
            <ActionMenu
                width="min-w-44"
                icon={
                    <div
                        className="
                relative
                flex
                items-center
                    w-full
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
                        title={'Cambie la guitarra seleccionada'}
                    >
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
                            <span className="text-xs flex-1 text-left">
                                {/* TODO: DEBE MOSTRAR UN ESTADO DE LOADING */}
                                {selectedGuitar?.name || 'Seleccionar guitarra'}
                            </span>
                            <div className="border-l border-l-gray-700 pl-1 sm:flex hidden">
                                <TriangleDownIcon className="size-5" />
                            </div>
                        </div>
                    </div>
                }
                options={guitars.map((g) => {
                    return {
                        label: g.name,
                        onClick: () => {
                            setSelectedGuitar(g);
                        },
                    };
                })}
            />
            {/* <OptionButton
                value={selectedGuitar?.name || ''}
                options={guitars.map((guitar) => guitar.name)}
                onChange={handleChange}
                title="Cambie la guitarra seleccionada"
            /> */}
        </>
    );
};
