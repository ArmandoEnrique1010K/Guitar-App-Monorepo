import { Modal } from '@/components';
import { usePresets, useSettings } from '@/hooks';
import { CrossIcon, PlusIcon } from '@/icons';
import { Button, InputText } from '@/ui';
import { isAxiosError } from 'axios';
import { useState } from 'react';

export const PresetModal = () => {
    const { savePreset, createPresetModal, closeCreatePresetModal } =
        usePresets();

    const [presetName, setPresetName] = useState('');

    // OBTIENE EL ESPACIO DE TRABAJO ACTUAL
    const { currentSelectedWorkspace } = useSettings();

    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmitAddWorkspace = async () => {
        if (!presetName.trim()) return;

        try {
            await savePreset(currentSelectedWorkspace._id, presetName);
            closeCreatePresetModal();
            setPresetName('');
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
                open={createPresetModal}
                onOpenChange={closeCreatePresetModal}
                title="Nueva configuración"
                children={
                    <>
                        <div className="flex flex-col gap-2">
                            <InputText
                                name="workspace-name"
                                placeholder="Nombre de la configuración"
                                value={presetName}
                                onChange={(e) => {
                                    setPresetName(e.target.value);
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
                                    closeCreatePresetModal();
                                    setPresetName('');
                                }}
                                text="Cancelar"
                            />
                            <Button
                                icon={<PlusIcon className="size-6" />}
                                onClick={handleSubmitAddWorkspace}
                                disabled={!presetName.trim()}
                                text="Crear"
                            />
                        </div>
                    </>
                }
            />
        </>
    );
};
