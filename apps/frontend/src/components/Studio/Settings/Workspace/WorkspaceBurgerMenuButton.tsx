import { useSettings } from '@/hooks';
import { DotsVerticalIcon } from '@/icons';
import { Menu } from '@ark-ui/react/menu';
import { WorkspaceEditModal } from './WorkspaceEditModal';

type Props = {
    workspaceId: string;
    workspaceName: string;
};

export const WorkspaceBurgerMenuButton = ({
    workspaceId,
    workspaceName,
}: Props) => {
    const {
        currentSelectedWorkspaceId,
        openEditWorkspaceModal,
        deleteOneWorkspace,
    } = useSettings();

    return (
        <>
            <Menu.Root>
                <Menu.Trigger className="flex items-center justify-center cursor-pointer">
                    <DotsVerticalIcon
                        // TODO: CAMBIAR EL COLOR DE HOVER
                        className={`
                            
                        size-6
                        
                        ${workspaceId === currentSelectedWorkspaceId ? 'text-black hover:text-slate-600' : 'text-green-500 hover:text-green-300'}
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
                                openEditWorkspaceModal({
                                    _id: workspaceId,
                                    name: workspaceName,
                                })
                            }
                        >
                            Editar
                        </Menu.Item>

                        <Menu.Item
                            value="Eliminar"
                            className="px-3 py-2 text-sm hover:bg-[#0000ff] hover:text-white cursor-pointer outline-none"
                            onClick={() => deleteOneWorkspace(workspaceId)}
                        >
                            Eliminar
                        </Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Menu.Root>

            {/* TODO: GENERAR VENTANA MODAL PARA EDITAR ESPACIO DE TRABAJO */}
            <WorkspaceEditModal />
        </>
    );
};
