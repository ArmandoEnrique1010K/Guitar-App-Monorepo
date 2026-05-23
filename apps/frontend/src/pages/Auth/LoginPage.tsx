import { Form, Formik, type FormikHelpers } from 'formik';
import { useNotifications } from 'reapop';
import { TextField } from '@/components/Auth/TextField';
import { PasswordField } from '@/components/Auth/PasswordField';
import { FormButton } from '@/components/Auth/FormButton';
import { SecondaryText } from '@/components/Auth/SecondaryText';
import { AuthTitle } from '@/components/Auth/AuthTitle';
import { handleFormikApiError } from '@/utils/handleFormikApiError';
import { useNavigate } from 'react-router-dom';
import type { LoginForm } from '@/schemas';
import { login } from '@/api/AuthAPI';

export const LoginPage = () => {
    const initialValues: LoginForm = {
        email: '',
        password: '',
    };
    const { notify } = useNotifications();
    const navigate = useNavigate();

    const handleSubmit = async (
        values: LoginForm,
        { setErrors, setStatus }: FormikHelpers<LoginForm>,
    ) => {
        try {
            const response = await login(values);
            // LOGIN EXITOSO
            if (typeof response === 'string') {
                setStatus(response);

                notify({
                    message: response,
                    status: 'success',
                });

                navigate('/');
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
            <AuthTitle title="Iniciar sesión" />

            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                // `validateOnBlur` indica si se va a validar el formulario cuando el usuario saca el foco de un campo de entrada. Por defecto es `true`.
                // Es útil cuando quieres que se realice la validación a medida que el usuario está ingresando los datos.
                validateOnBlur={false}
                // `validateOnChange` indica si se va a validar el formulario cuando se modifica un campo de entrada. Por defecto es `true`.
                // Es útil cuando quieres que se realice la validación a medida que el usuario está ingresando los datos.
                validateOnChange={false}
                // `validateOnMount` indica si se va a validar el formulario cuando se monta el componente. Por defecto es `true`.
                // Es útil cuando quieres que se realice la validación al inicio del componente, antes de que el usuario haya ingresado ningún dato.
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
                        </div>
                        <div className="flex flex-col my-6">
                            <FormButton text="Iniciar Sesión" type="submit" />
                        </div>
                    </Form>
                )}
            </Formik>
            <div className="flex flex-col gap-4">
                <SecondaryText
                    text="¿No tienes una cuenta?"
                    linkText="Regístrate aquí"
                    link="/auth/register"
                />

                <SecondaryText
                    text="Si olvidaste tu contraseña."
                    linkText="Cámbiala aquí"
                    link="/auth/forgot-password"
                />
            </div>
        </>
    );
};
