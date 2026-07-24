import { usePresets } from '@/hooks';
import { DotsVerticalIcon } from '@/icons';
import { PresetEditModal, ActionMenu } from '@/components';

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
                        className={`size-5 ${presetId === currentPresetSelected._id ? 'text-black hover:text-slate-700' : 'text-green-500 hover:text-green-400'}`}
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

            <PresetEditModal />
        </>
    );
};
