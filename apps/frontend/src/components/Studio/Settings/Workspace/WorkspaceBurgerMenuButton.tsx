import { useSettings } from '@/hooks';
import { DotsVerticalIcon } from '@/icons';
import { Menu } from '@ark-ui/react/menu';
import { WorkspaceEditModal } from './WorkspaceEditModal';
import { ActionMenu } from '@/components';

type Props = {
    workspaceId: string;
    workspaceName: string;
};

export const WorkspaceBurgerMenuButton = ({
    workspaceId,
    workspaceName,
}: Props) => {
    const {
        currentSelectedWorkspace,
        openEditWorkspaceModal,
        deleteOneWorkspace,
    } = useSettings();

    return (
        <>
            <ActionMenu
                icon={
                    <DotsVerticalIcon
                        // TODO: CAMBIAR EL COLOR DE HOVER
                        className={`
                            
                        size-6
                        
                        ${workspaceId === currentSelectedWorkspace._id ? 'text-black hover:text-slate-600' : 'text-green-500 hover:text-green-300'}
                            `}
                    />
                }
                options={[
                    {
                        label: 'Editar',
                        onClick: () => {
                            openEditWorkspaceModal({
                                _id: workspaceId,
                                name: workspaceName,
                            });
                        },
                    },
                    {
                        label: 'Eliminar',
                        onClick: () => {
                            deleteOneWorkspace(workspaceId);
                        },
                    },
                ]}
            />

            {/* TODO: GENERAR VENTANA MODAL PARA EDITAR ESPACIO DE TRABAJO */}
            <WorkspaceEditModal />
        </>
    );
};
