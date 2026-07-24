import { useWorkspace } from '@/hooks';
import { DotsVerticalIcon } from '@/icons';
import { WorkspaceEditModal, ActionMenu } from '@/components';

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
    } = useWorkspace();

    return (
        <>
            <ActionMenu
                icon={
                    <DotsVerticalIcon
                        className={`size-5 ${workspaceId === currentSelectedWorkspace._id ? 'text-black hover:text-slate-700' : 'text-green-500 hover:text-green-400'}`}
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

            <WorkspaceEditModal />
        </>
    );
};
