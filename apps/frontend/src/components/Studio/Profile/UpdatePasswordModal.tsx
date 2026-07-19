import { Modal } from '@/components/Modal';
import { useProfile } from '@/hooks';
import { CrossIcon, PlusIcon } from '@/icons';
import type { Error } from '@/types';
import { Button, InputText } from '@/ui';
import { isErrorResponse, isErrorResponseWithFields } from '@/utils';
import { useState } from 'react';
import { useNotifications } from 'reapop';

export const UpdatePasswordModal = () => {
    const { notify } = useNotifications();
    const {
        showUpdatePasswordModal,
        toggleUpdatePasswordModal,
        updatePassword,
    } = useProfile();

    const [dataForm, setDataForm] = useState({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const [errorMessagesFields, setErrorMessagesFields] = useState({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmitUpdatePassword = async () => {
        try {
            const data = await updatePassword(dataForm);

            setErrorMessagesFields({
                current_password: '',
                password: '',
                password_confirmation: '',
            });

            if (isErrorResponseWithFields(data)) {
                const errors = data.errors as Error[];

                const getMessage = (path: string) =>
                    errors.find((e) => e.path === path)?.msg ?? '';

                setErrorMessagesFields({
                    current_password: getMessage('current_password'),
                    password: getMessage('password'),
                    password_confirmation: getMessage('password_confirmation'),
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

            setDataForm({
                current_password: '',
                password: '',
                password_confirmation: '',
            });

            toggleUpdatePasswordModal();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            title="Cambio de contraseña"
            open={showUpdatePasswordModal}
            onOpenChange={toggleUpdatePasswordModal}
            children={
                <div className="flex flex-col gap-4">
                    <InputText
                        label="Contraseña actual"
                        name="current_password"
                        placeholder="Escriba su contraseña actual"
                        value={dataForm.current_password}
                        onChange={(e) => {
                            setDataForm({
                                ...dataForm,
                                current_password: e.target.value,
                            });
                        }}
                    />
                    {errorMessagesFields?.current_password && (
                        <div className="text-red-500">
                            {errorMessagesFields?.current_password}
                        </div>
                    )}
                    <InputText
                        label="Nueva contraseña"
                        name="password"
                        placeholder="Escriba su nueva contraseña"
                        value={dataForm.password}
                        onChange={(e) => {
                            setDataForm({
                                ...dataForm,
                                password: e.target.value,
                            });
                        }}
                    />
                    {errorMessagesFields?.password && (
                        <div className="text-red-500">
                            {errorMessagesFields?.password}
                        </div>
                    )}
                    <InputText
                        label="Confirmar nueva contraseña"
                        name="password_confirmation"
                        placeholder="Confirme su nueva contraseña"
                        value={dataForm.password_confirmation}
                        onChange={(e) => {
                            setDataForm({
                                ...dataForm,
                                password_confirmation: e.target.value,
                            });
                        }}
                    />
                    {errorMessagesFields?.password_confirmation && (
                        <div className="text-red-500">
                            {errorMessagesFields?.password_confirmation}
                        </div>
                    )}

                    <div className="flex flex-row justify-between gap-2">
                        <Button
                            icon={<CrossIcon className="size-6" />}
                            onClick={() => {
                                toggleUpdatePasswordModal();
                            }}
                            text="Cancelar"
                        />
                        <Button
                            icon={<PlusIcon className="size-6" />}
                            onClick={handleSubmitUpdatePassword}
                            text="Editar"
                        />
                    </div>
                </div>
            }
        />
    );
};
