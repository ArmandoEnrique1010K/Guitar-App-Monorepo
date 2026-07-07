import { useNotifications } from 'reapop';
import { handleFormikApiError } from '@/utils';
import { Form, Formik, type FormikHelpers } from 'formik';
import { AuthTitle, TextField, FormButton, SecondaryText } from '@/components';
import type { RequestPasswordResetForm } from '@/types';
import { requestPasswordReset } from '@/api';

export const RequestPasswordResetPage = () => {
    const initialValues: RequestPasswordResetForm = {
        email: '',
    };
    const { notify } = useNotifications();

    const handleSubmit = async (
        values: RequestPasswordResetForm,
        { setErrors, setStatus }: FormikHelpers<RequestPasswordResetForm>,
    ) => {
        const response = await requestPasswordReset(values);

        // LOGIN EXITOSO
        if (typeof response === 'string') {
            setStatus(response);

            notify({
                message: response,
                status: 'success',
            });
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
