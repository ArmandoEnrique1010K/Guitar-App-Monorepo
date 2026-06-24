import { useNotifications } from 'reapop';
import { handleFormikApiError } from '@/utils';
import { Form, Formik, type FormikHelpers } from 'formik';
import type { RequestCodeForm } from '@/schemas';
import { requestCode } from '@/api';
import { AuthTitle, FormButton, TextField } from '@/components';

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
            <AuthTitle title="Solicitar código" />

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
                            Introduce tu correo y te enviaremos un código de 6
                            dígitos.
                        </p>
                        <div className="flex flex-col gap-4">
                            <TextField
                                id="email"
                                label="Correo"
                                placeholder="correo@ejemplo.com"
                                type="email"
                            />
                        </div>
                        <div className="flex flex-col mt-6">
                            <FormButton text="Enviar código" type="submit" />
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};
