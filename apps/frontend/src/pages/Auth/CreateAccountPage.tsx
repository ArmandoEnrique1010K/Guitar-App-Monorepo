import { Form, Formik, type FormikHelpers } from 'formik';
import {
    AuthTitle,
    TextField,
    PasswordField,
    FormButton,
    SecondaryText,
} from '@/components';
import { createAccount } from '@/api';
import { useNotifications } from 'reapop';
import { handleFormikApiError } from '@/utils';
import type { CreateAccountForm } from '@/types';

export const CreateAccountPage = () => {
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
        const response = await createAccount(values);
        // console.log(response);

        // REGISTRO EXITOSO
        if (typeof response === 'string') {
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
