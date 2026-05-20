import { Form, Formik, type FormikHelpers } from 'formik';
import { AuthTitle } from '@/components/Auth/AuthTitle';
import { createAccount } from '@/api/AuthAPI';
import { useNotifications } from 'reapop';
import { TextField } from '@/ui/Formik/TextField';
import { PasswordField } from '@/ui/Formik/PasswordField';
import { FormButton } from '@/ui/FormButton';
import { SecondaryText } from '@/components/Auth/SecondaryText';
import { handleFormikApiError } from '@/utils/handleFormikApiError';
import type { CreateAccountForm } from '@/schemas';

export const RegisterPage = () => {
    const initialValues: CreateAccountForm = {
        email: '',
        password: '',
        password_confirmation: '',
        name: '',
    };

    const { notify } = useNotifications();

    const handleSubmit = async (
        values: CreateAccountForm,
        { setErrors, setStatus }: FormikHelpers<CreateAccountForm>,
    ) => {
        try {
            const response = await createAccount(values);
            // console.log(response);

            // REGISTRO EXITOSO
            if (typeof response === 'string') {
                notify({
                    message: response,
                    status: 'success',
                });
            }
        } catch (error) {
            handleFormikApiError({
                error,
                setErrors,
                setStatus,
                notify,
            });

            // const data = error.response.data;
            // console.log(data);

            // if (data.errors) {
            //     const formikErrors: Record<string, string> = {};

            //     data.errors.forEach((err: { path: string; msg: string }) => {
            //         formikErrors[err.path] = err.msg;
            //     });

            //     setErrors(formikErrors);
            // }

            // if (data.error) {
            //     setStatus(data.error);

            //     notify({
            //         message: data.error,
            //         status: 'error',
            //     });
            // }
        }
    };

    return (
        <>
            <AuthTitle title="Regístrate" />

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
                            <TextField
                                id="name"
                                label="Nombre"
                                placeholder="Nombre"
                                type="text"
                            />

                            <TextField
                                id="email"
                                label="Correo"
                                placeholder="correo@ejemplo.com"
                                type="email"
                            />

                            <PasswordField
                                id="password"
                                label="Contraseña"
                                placeholder="********"
                            />

                            <PasswordField
                                id="password_confirmation"
                                label="Confirmar Contraseña"
                                placeholder="********"
                            />
                        </div>
                        <div className="flex flex-col my-6">
                            <FormButton text="Registrar" type="submit" />
                        </div>
                    </Form>
                )}
            </Formik>

            <SecondaryText
                text="¿Ya tienes cuenta?"
                linkText="Inicia sesión aquí"
                link="/auth"
            />
        </>
    );
};
