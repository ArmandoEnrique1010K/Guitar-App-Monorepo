import { useNotifications } from 'reapop';
import { handleFormikApiError } from '@/utils/handleFormikApiError';
import { Form, Formik, type FormikHelpers } from 'formik';
import { AuthTitle } from '@/components/Auth/AuthTitle';
import { TextField } from '@/ui/Formik/TextField';
import { FormButton } from '@/ui/FormButton';
import { SecondaryText } from '@/components/Auth/SecondaryText';
import type { RequestCodeForm } from '@/schemas';
import { requestCode } from '@/api/AuthAPI';

export const RequestCodePage = () => {
    const initialValues: RequestCodeForm = {
        email: '',
    };
    const { notify } = useNotifications();

    const handleSubmit = async (
        values: RequestCodeForm,
        { setErrors, setStatus }: FormikHelpers<RequestCodeForm>,
    ) => {
        try {
            const response = await requestCode(values);

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
            <AuthTitle title="Solicitar token" />

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
                            Si olvidastes tu contraseña introduce tu correo y te
                            enviaremos un token para que puedas restablecer tu
                            contraseña.
                        </p>
                        <div className="flex flex-col gap-4">
                            <TextField
                                id="email"
                                label="Correo"
                                placeholder="correo@ejemplo.com"
                                type="email"
                            />
                        </div>
                        <div className="flex flex-col my-6">
                            <FormButton text="Enviar token" type="submit" />
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
