import { resetPassword } from '@/api';
import { FormButton, PasswordField } from '@/components';
import type { ResetPasswordForm } from '@/types';
import { handleFormikApiError } from '@/utils';
import { Form, Formik, type FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from 'reapop';

type Props = {
    token: string;
};

const initialValues: ResetPasswordForm = {
    password: '',
    password_confirmation: '',
};

export const ResetPasswordView = ({ token }: Props) => {
    const navigate = useNavigate();
    const { notify } = useNotifications();

    const handleSubmit = async (
        values: ResetPasswordForm,
        { setErrors, setStatus }: FormikHelpers<ResetPasswordForm>,
    ) => {
        const response = await resetPassword(token, values);
        if (typeof response === 'string') {
            setStatus(response);

            notify({
                message: response,
                status: 'success',
            });

            navigate('/auth');
        } else {
            handleFormikApiError({
                response,
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
