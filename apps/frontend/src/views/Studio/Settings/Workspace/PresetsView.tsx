import {
    EffectControlsContainer,
    PresetBurgerMenuButton,
    PresetModal,
    TextContainer,
} from '@/components';
import { usePresets, useSettings } from '@/hooks';
import {
    BackwardIcon,
    NextArrowIcon,
    PlusIcon,
    PreviousArrowIcon,
} from '@/icons';
import { Button } from '@/ui';
import { ArrowBottomLeftIcon } from '@radix-ui/react-icons';

export const PresetsView = () => {
    const {
        currentSelectedWorkspace,
        setWorkspaceView,
        setCurrentSelectedWorkspace,
    } = useSettings();
    const {
        openCreatePresetModal,
        presets,
        currentPresetSelected,
        setCurrentSelectedPreset,
        applyPresetSelected,
        clearPresets,
    } = usePresets();

    return (
        <div className="flex h-full min-h-0 flex-col gap-2">
            <div className="flex flex-row gap-2 min-h-0">
                <Button
                    text="Atras"
                    title="Volver a espacios de trabajo"
                    icon={<BackwardIcon className="size-4" />}
                    onClick={() => {
                        setWorkspaceView('workspaces');

                        //
                        setCurrentSelectedWorkspace({
                            _id: '',
                            name: '',
                        });
                        clearPresets();
                    }}
                />

                {/* TODO: AGREGAR LOGICA A LOS BOTONES DE CAMBIO DE CONFIGURACION DE SONIDO */}
                <Button
                    text="Anterior"
                    title="Cambio"
                    icon={<PreviousArrowIcon className="size-4" />}
                    onClick={() => {}}
                />
                <TextContainer>{currentSelectedWorkspace.name}</TextContainer>
                <Button
                    text="Anterior"
                    title="Cambio"
                    icon={<NextArrowIcon className="size-4" />}
                    onClick={() => {}}
                />

                <Button
                    text="Atras"
                    title="Agregar la configuración y efectos actuales"
                    icon={<PlusIcon className="size-4" />}
                    onClick={() => openCreatePresetModal()}
                />
            </div>

            {/* <div>{JSON.stringify(profile, null, 2)}</div> */}

            <EffectControlsContainer>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {presets.map((preset) => (
                        <div
                            key={preset._id}
                            className="relative snap-start p-2"
                        >
                            <button
                                className={`flex flex-col text-center w-full 
                            rounded-lg border border-slate-600
                             
                            p-4  ${
                                currentPresetSelected._id === preset._id
                                    ? 'bg-green-500 text-black'
                                    : '                             hover:bg-slate-700 hover:text-green-500 bg-black text-green-500'
                            }`}
                                onClick={() => {
                                    setCurrentSelectedPreset({
                                        _id: preset._id,
                                        name: preset.name,
                                    });

                                    applyPresetSelected(preset._id);
                                }}
                            >
                                <span className="truncate font-medium">
                                    {preset.name}
                                </span>
                            </button>

                            <div className="absolute top-0 right-0 p-2">
                                <div className="pt-2 pr-1">
                                    {/* <WorkspaceBurgerMenuButton
                                        workspaceId={workspace._id}
                                        workspaceName={workspace.name}
                                    /> */}
                                    {/* BurgerMenu para las configuraciones */}
                                    <PresetBurgerMenuButton
                                        presetId={preset._id}
                                        presetName={preset.name}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </EffectControlsContainer>

            <PresetModal />
        </div>
    );
};
