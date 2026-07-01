import { usePresets } from '@/hooks';
import { DotsVerticalIcon } from '@/icons';
import { Menu } from '@ark-ui/react/menu';
import { PresetEditModal } from './PresetEditModal';

type Props = {
    presetId: string;
    presetName: string;
};

export const PresetBurgerMenuButton = ({ presetId, presetName }: Props) => {
    const { currentPresetSelected, openEditPresetModal, deleteOnePreset } =
        usePresets();

    return (
        <>
            <Menu.Root>
                <Menu.Trigger className="flex items-center justify-center cursor-pointer">
                    <DotsVerticalIcon
                        // TODO: CAMBIAR EL COLOR DE HOVER
                        className={`
                            
                        size-6
                        
                        ${presetId === currentPresetSelected._id ? 'text-black hover:text-slate-600' : 'text-green-500 hover:text-green-300'}
                            `}
                    />
                </Menu.Trigger>

                <Menu.Positioner>
                    <Menu.Content
                        className="min-w-28 z-30 border border-gray-200 bg-white shadow-xl outline-none 
                            focus:outline-none focus-visible:outline-none flex flex-col"
                    >
                        <Menu.Item
                            value="Editar"
                            className="px-3 py-2 text-sm hover:bg-[#0000ff] hover:text-white cursor-pointer outline-none"
                            onClick={() =>
                                openEditPresetModal({
                                    _id: presetId,
                                    name: presetName,
                                })
                            }
                        >
                            Editar
                        </Menu.Item>

                        <Menu.Item
                            value="Eliminar"
                            className="px-3 py-2 text-sm hover:bg-[#0000ff] hover:text-white cursor-pointer outline-none"
                            onClick={() => deleteOnePreset(presetId)}
                        >
                            Eliminar
                        </Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Menu.Root>

            {/* TODO: GENERAR VENTANA MODAL PARA EDITAR PRESET */}
            <PresetEditModal />
        </>
    );
};
