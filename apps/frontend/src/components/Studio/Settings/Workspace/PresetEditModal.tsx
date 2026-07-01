import { usePresets } from '@/hooks';
import { Modal } from '@/components/Modal';
import { CrossIcon } from '@/icons';
import { Button, InputText } from '@/ui';
import { PlusIcon } from '@radix-ui/react-icons';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';

export const PresetEditModal = () => {
    const { editPreset, editPresetModal, editingPreset, closeEditPresetModal } =
        usePresets();
    const [name, setName] = useState(editingPreset?.name || '');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setName(editingPreset?.name ?? '');
    }, [editingPreset]);

    const handleSubmitEditWorkspace = async () => {
        if (!name.trim()) return;

        try {
            await editPreset(editingPreset?._id, name);
            closeEditPresetModal();
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
                open={editPresetModal}
                onOpenChange={closeEditPresetModal}
                title="Aplicar cambios a la configuración seleccionada"
            >
                <>
                    <div className="flex flex-col gap-2">
                        <InputText
                            name="preset-name"
                            placeholder="Nombre de la configuración"
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
                                closeEditPresetModal();
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
