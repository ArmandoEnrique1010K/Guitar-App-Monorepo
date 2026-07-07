import { useNotifications } from 'reapop';
import { handleFormikApiError } from '@/utils';
import { Form, Formik, type FormikHelpers } from 'formik';
import type { RequestConfirmationCodeForm } from '@/types';
import { requestConfirmationCode } from '@/api';
import { AuthTitle, FormButton, TextField } from '@/components';

export const RequestConfirmationCodePage = () => {
    const initialValues: RequestConfirmationCodeForm = {
        email: '',
    };
    const { notify } = useNotifications();

    const handleSubmit = async (
        values: RequestConfirmationCodeForm,
        { setErrors, setStatus }: FormikHelpers<RequestConfirmationCodeForm>,
    ) => {
        const response = await requestConfirmationCode(values);

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
