import {
    EffectControlsContainer,
    TextContainer,
    WorkspaceModal,
} from '@/components';
import { useProfile, useSettings } from '@/hooks';
import { PlusIcon } from '@/icons';
import { Button } from '@/ui';
import { useEffect } from 'react';

export const WorkspaceView = () => {
    const { profile } = useProfile();

    const {
        setAddWorkspaceModal,
        loadWorkspaces,
        workspaces,
        currentSelectedWorkspaceId,
        setCurrentSelectedWorkspaceId,
    } = useSettings();

    useEffect(() => {
        loadWorkspaces();
    }, []);

    return (
        <div className="flex h-full min-h-0 flex-col gap-4">
            <div className="flex flex-row gap-4 min-h-0">
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

            {/* <div>{JSON.stringify(profile, null, 2)}</div> */}

            <EffectControlsContainer>
                <div className="grid grid-cols-1 gap-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {workspaces.map((workspace) => (
                        <div
                            key={workspace._id}
                            className="relative snap-start p-2"
                        >
                            <button
                                className={`flex flex-col text-center w-full 
                            rounded-lg border border-slate-600
                             hover:bg-slate-700 hover:text-green-500
                             
                            p-4 transition ${currentSelectedWorkspaceId === workspace._id ? 'bg-green-500 text-black' : 'bg-black text-green-500'}`}
                                onClick={() =>
                                    setCurrentSelectedWorkspaceId(workspace._id)
                                }
                            >
                                <span className="truncate font-medium">
                                    {workspace.name}
                                </span>
                                <span className="text-xs">
                                    {/* TODO: NUEVO COMPONENTE PARA CAMBIAR EL TEXTO */}
                                    {workspace.presetCount} configuraciones
                                </span>
                            </button>

                            <div className="absolute top-0 right-0 p-2">
                                <div className="bg-gray-100 text-gray-500 p-1 rounded">
                                    {/* TODO: CREAR UN NUEVO MENU DE HAMBURGUESA */}
                                    menu
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
