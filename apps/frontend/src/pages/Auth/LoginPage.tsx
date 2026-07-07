import { Form, Formik, type FormikHelpers } from 'formik';
import { useNotifications } from 'reapop';
import {
    AuthTitle,
    FormButton,
    PasswordField,
    SecondaryText,
    TextField,
} from '@/components';
import { useNavigate } from 'react-router-dom';
import type { LoginForm } from '@/types';
import { login } from '@/api';
import { useProfile } from '@/hooks';
import { handleFormikApiError } from '@/utils';

const initialValues: LoginForm = {
    email: '',
    password: '',
};

export const LoginPage = () => {
    const { notify } = useNotifications();
    const navigate = useNavigate();
    const { getProfile } = useProfile();

    const handleSubmit = async (
        values: LoginForm,
        { setErrors, setStatus }: FormikHelpers<LoginForm>,
    ) => {
        const response = await login(values);
        if (typeof response === 'string') {
            setStatus(response);
            await getProfile();

            notify({
                message: response,
                status: 'success',
            });

            navigate('/', { replace: true });
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
            <AuthTitle title="Iniciar sesión" />

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
