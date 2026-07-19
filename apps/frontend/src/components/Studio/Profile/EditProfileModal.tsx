import { Modal } from '@/components/Modal';
import { useProfile } from '@/hooks';
import { CrossIcon, PlusIcon } from '@/icons';
import type { Error } from '@/types';
import { Button, InputText } from '@/ui';
import { isErrorResponse, isErrorResponseWithFields } from '@/utils';
import { useState } from 'react';
import { useNotifications } from 'reapop';

export const EditProfileModal = () => {
    const { notify } = useNotifications();
    const {
        showEditProfileModal,
        toggleEditProfileModal,
        editProfile,
        profile,
    } = useProfile();

    const [dataForm, setDataForm] = useState({
        name: profile?.name,
        email: profile?.email,
    });

    const [errorMessagesFields, setErrorMessagesFields] = useState({
        name: '',
        email: '',
    });

    const handleSubmitEditProfile = async () => {
        try {
            const data = await editProfile(dataForm);

            setErrorMessagesFields({
                name: '',
                email: '',
            });

            if (isErrorResponseWithFields(data)) {
                const errors = data.errors as Error[];

                const getMessage = (path: string) =>
                    errors.find((e) => e.path === path)?.msg ?? '';

                setErrorMessagesFields({
                    name: getMessage('name'),
                    email: getMessage('email'),
                });

                return;
            }

            if (isErrorResponse(data)) {
                const error = data.error as string;

                notify({
                    message: error,
                    status: 'error',
                });

                return;
            }
            notify({
                message: data,
                status: 'success',
            });

            toggleEditProfileModal();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            title="Editar perfil"
            open={showEditProfileModal}
            onOpenChange={toggleEditProfileModal}
            children={
                <div className="flex flex-col gap-4">
                    <InputText
                        label="Nombre de usuario"
                        name="name"
                        placeholder="Escriba su nombre"
                        value={dataForm.name}
                        onChange={(e) => {
                            setDataForm({ ...dataForm, name: e.target.value });
                        }}
                    />
                    {errorMessagesFields?.name && (
                        <div className="text-red-500">
                            {errorMessagesFields?.name}
                        </div>
                    )}
                    <InputText
                        label="Correo"
                        name="email"
                        placeholder="Correo de usuario"
                        value={dataForm.email}
                        onChange={(e) => {
                            setDataForm({ ...dataForm, email: e.target.value });
                        }}
                    />
                    {errorMessagesFields?.email && (
                        <div className="text-red-500">
                            {errorMessagesFields?.email}
                        </div>
                    )}

                    <div className="flex flex-row justify-between gap-2">
                        <Button
                            icon={<CrossIcon className="size-6" />}
                            onClick={() => {
                                toggleEditProfileModal();
                            }}
                            text="Cancelar"
                        />
                        <Button
                            icon={<PlusIcon className="size-6" />}
                            onClick={handleSubmitEditProfile}
                            text="Editar"
                        />
                    </div>
                </div>
            }
        />
    );
};
