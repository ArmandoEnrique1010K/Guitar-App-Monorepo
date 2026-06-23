import { updatePasswordWithToken } from '@/api/AuthAPI';
import type { UpdatePasswordForm } from '@/schemas';
import { FormButton } from '@/components/Auth/FormButton';
import { PasswordField } from '@/components/Auth/PasswordField';
import { handleFormikApiError } from '@/utils/handleFormikApiError';
import { Form, Formik, type FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from 'reapop';

type Props = {
    token: string;
};

export const NewPasswordFormView = ({ token }: Props) => {
    const navigate = useNavigate();
    const initialValues: UpdatePasswordForm = {
        password: '',
        password_confirmation: '',
    };
    const { notify } = useNotifications();
    const handleSubmit = async (
        values: UpdatePasswordForm,
        { setErrors, setStatus }: FormikHelpers<UpdatePasswordForm>,
    ) => {
        try {
            const response = await updatePasswordWithToken(token, values);
            if (typeof response === 'string') {
                setStatus(response);

                notify({
                    message: response,
                    status: 'success',
                });
                navigate('/auth');
            }
        } catch (error) {
            handleFormikApiError({
                error,
                setErrors,
                setStatus,
                notify,
            });
        }
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
                validateOnMount={false}
            >
                {() => (
                    <Form
                        className="w-full flex flex-col"
                        noValidate
                        autoComplete="off"
                    >
                        <div className="flex flex-col gap-4">
                            <PasswordField
                                id="password"
                                label="Contraseña"
                                placeholder="********"
                            />
                            <PasswordField
                                id="password_confirmation"
                                label="Confirmar contraseña"
                                placeholder="********"
                            />
                        </div>
                        <div className="flex flex-col my-6">
                            <FormButton
                                text="Establecer contraseña"
                                type="submit"
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};
