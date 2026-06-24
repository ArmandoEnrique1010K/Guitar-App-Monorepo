import { useNotifications } from 'reapop';
import { handleFormikApiError } from '@/utils';
import { Form, Formik, type FormikHelpers } from 'formik';
import { AuthTitle, TextField, FormButton, SecondaryText } from '@/components';
import type { RequestCodeForm } from '@/schemas';
import { forgotPassword } from '@/api';

export const ForgotPasswordPage = () => {
    const initialValues: RequestCodeForm = {
        email: '',
    };
    const { notify } = useNotifications();

    const handleSubmit = async (
        values: RequestCodeForm,
        { setErrors, setStatus }: FormikHelpers<RequestCodeForm>,
    ) => {
        try {
            const response = await forgotPassword(values);

            // LOGIN EXITOSO
            if (typeof response === 'string') {
                setStatus(response);

                notify({
                    message: response,
                    status: 'success',
                });
            }

            // El objeto response es string cuando el usuario ha iniciado sesion
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
            <AuthTitle title="Olvidaste la contraseña" />

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
                        <p className="text-sm text-left mb-6 w-full sm:max-w-md max-w-full">
                            Introduce tu correo y te enviaremos un código para
                            que puedas restablecer tu contraseña.
                        </p>
                        <div className="flex flex-col">
                            <TextField
                                id="email"
                                label="Correo"
                                placeholder="correo@ejemplo.com"
                                type="email"
                            />
                        </div>
                        <div className="flex flex-col my-6">
                            <FormButton text="Enviar código" type="submit" />
                        </div>
                    </Form>
                )}
            </Formik>

            <SecondaryText
                text="¿Recuerdas tu contraseña?"
                linkText="Inicia sesión aquí"
                link="/auth"
            />
        </>
    );
};
