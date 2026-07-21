import { Modal } from '@/components/Modal';
import { useWorkspace } from '@/hooks';
import { CrossIcon } from '@/icons';
import { Button, InputText } from '@/ui';
import { PlusIcon } from '@radix-ui/react-icons';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';

export const WorkspaceEditModal = () => {
    const {
        editWorkspace,
        editWorkspaceModal,
        editingWorkspace,
        closeEditWorkspaceModal,
    } = useWorkspace();

    const [name, setName] = useState(editingWorkspace?.name || '');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setName(editingWorkspace?.name ?? '');
    }, [editingWorkspace]);

    const handleSubmitEditWorkspace = async () => {
        if (!name.trim()) return;

        try {
            await editWorkspace(editingWorkspace?._id, name);
            closeEditWorkspaceModal();
            setErrorMessage('');
            setName('');
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
                open={editWorkspaceModal}
                onOpenChange={closeEditWorkspaceModal}
                title="Editar espacio de trabajo"
            >
                <>
                    <div className="flex flex-col gap-2">
                        <InputText
                            name="workspace-name"
                            placeholder="Nombre del espacio de trabajo"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                if (errorMessage) {
                                    setErrorMessage('');
                                }
                            }}
                        />
                        {errorMessage && (
                            <div className="text-red-500">{errorMessage}</div>
                        )}
                    </div>
                    <div className="flex flex-row justify-between gap-2">
                        <Button
                            icon={<CrossIcon className="size-6" />}
                            onClick={() => {
                                closeEditWorkspaceModal();
                                setErrorMessage('');
                                setName('');
                            }}
                            text="Cancelar"
                        />
                        <Button
                            icon={<PlusIcon className="size-6" />}
                            onClick={handleSubmitEditWorkspace}
                            disabled={!name.trim()}
                            text="Editar"
                        />
                    </div>
                </>
            </Modal>
        </>
    );
};
