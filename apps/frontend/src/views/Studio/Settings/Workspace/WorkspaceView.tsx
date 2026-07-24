import {
    EffectControlsContainer,
    PresetsCounterText,
    TextContainer,
    WorkspaceBurgerMenuButton,
    WorkspaceModal,
} from '@/components';
import { useProfile, useWorkspace } from '@/hooks';
import { PlusIcon } from '@/icons';
import { Button } from '@/ui';

export const WorkspaceView = () => {
    const { profile } = useProfile();

    const {
        setAddWorkspaceModal,
        workspaces,
        setWorkspaceView,
        currentSelectedWorkspace,
        setCurrentSelectedWorkspace,
    } = useWorkspace();

    return (
        <div className="flex h-full min-h-0 flex-col gap-2">
            <div className="flex flex-row gap-2 min-h-0">
                <TextContainer>
                    {profile
                        ? 'Seleccione un espacio de trabajo'
                        : 'Inicie sesión para crear o seleccionar un espacio de trabajo'}
                </TextContainer>
                {profile && (
                    <Button
                        text="Agregar"
                        title="Agregar un espacio de trabajo"
                        icon={<PlusIcon className="size-4" />}
                        onClick={() => {
                            setAddWorkspaceModal(true);
                        }}
                    ></Button>
                )}
            </div>

            <EffectControlsContainer>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {workspaces.map((workspace) => (
                        <div
                            key={workspace._id}
                            className="relative snap-start p-2"
                        >
                            <button
                                className={`flex flex-col text-center w-full 
                            rounded-lg border border-slate-600
                             
                            py-2 px-6 ${
                                currentSelectedWorkspace._id === workspace._id
                                    ? 'bg-green-500 text-black'
                                    : 'hover:bg-slate-700 hover:text-green-500 bg-black text-green-500'
                            }`}
                                onClick={() => {
                                    setCurrentSelectedWorkspace({
                                        _id: workspace._id,
                                        name: workspace.name,
                                    });
                                    setWorkspaceView('presets');
                                }}
                                title={workspace.name}
                            >
                                <span className="truncate font-medium">
                                    {workspace.name}
                                </span>
                                <PresetsCounterText
                                    presetCount={workspace.presetCount}
                                />
                            </button>

                            <div className="absolute top-0 right-0">
                                <div className="pt-4 pr-4">
                                    <WorkspaceBurgerMenuButton
                                        workspaceId={workspace._id}
                                        workspaceName={workspace.name}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </EffectControlsContainer>

            <WorkspaceModal />
        </div>
    );
};
