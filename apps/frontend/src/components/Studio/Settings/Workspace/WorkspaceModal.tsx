import { Modal } from '@/components';
import { useSettings } from '@/hooks';
import { CrossIcon, PlusIcon, UpArrowIcon } from '@/icons';
import { Button, InputText } from '@/ui';
import { isAxiosError } from 'axios';
import { useState } from 'react';

export const WorkspaceModal = () => {
    const { addWorkspaceModal, setAddWorkspaceModal, addWorkspace } =
        useSettings();

    const [workspaceName, setWorkspaceName] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmitAddWorkspace = async () => {
        if (!workspaceName.trim()) return;

        try {
            await addWorkspace(workspaceName);
            setAddWorkspaceModal(false);
            setWorkspaceName('');
        } catch (error) {
            if (isAxiosError(error)) {
                setErrorMessage(
                    error.response?.data.error || 'Ha ocurrido un error',
                );
            }
        }
    };

    return (
        <>
            <Modal
                open={addWorkspaceModal}
                onOpenChange={setAddWorkspaceModal}
                title="Nuevo espacio de trabajo"
                children={
                    <>
                        <div className="flex flex-col gap-2">
                            <InputText
                                name="workspace-name"
                                placeholder="Nombre del espacio de trabajo"
                                value={workspaceName}
                                onChange={(e) => {
                                    setWorkspaceName(e.target.value);
                                    if (errorMessage) {
                                        setErrorMessage('');
                                    }
                                }}
                            />
                            {errorMessage && (
                                <div className="text-red-500">
                                    {errorMessage}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-row justify-between gap-2">
                            <Button
                                icon={<CrossIcon className="size-6" />}
                                onClick={() => {
                                    setAddWorkspaceModal(false);
                                    setWorkspaceName('');
                                }}
                                text="Cancelar"
                            />
                            <Button
                                icon={<PlusIcon className="size-6" />}
                                onClick={handleSubmitAddWorkspace}
                                disabled={!workspaceName.trim()}
                                text="Crear"
                            />
                        </div>
                    </>
                }
            />
        </>
    );
};
