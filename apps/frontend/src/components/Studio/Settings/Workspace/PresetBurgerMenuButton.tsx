import { usePresets } from '@/hooks';
import { DotsVerticalIcon } from '@/icons';
import { PresetEditModal } from './PresetEditModal';
import { ActionMenu } from '@/components';

type Props = {
    presetId: string;
    presetName: string;
};

export const PresetBurgerMenuButton = ({ presetId, presetName }: Props) => {
    const { currentPresetSelected, openEditPresetModal, deleteOnePreset } =
        usePresets();

    return (
        <>
            <ActionMenu
                icon={
                    <DotsVerticalIcon
                        // TODO: CAMBIAR EL COLOR DE HOVER
                        className={`
                            
                        size-6
                        
                        ${presetId === currentPresetSelected._id ? 'text-black hover:text-slate-600' : 'text-green-500 hover:text-green-300'}
                            `}
                    />
                }
                options={[
                    {
                        label: 'Editar',
                        onClick: () =>
                            openEditPresetModal({
                                _id: presetId,
                                name: presetName,
                            }),
                    },
                    {
                        label: 'Eliminar',
                        onClick: () => deleteOnePreset(presetId),
                    },
                ]}
            />

            {/* TODO: GENERAR VENTANA MODAL PARA EDITAR PRESET */}
            <PresetEditModal />
        </>
    );
};
