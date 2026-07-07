import { validatePasswordResetToken } from '@/api';
import { DigitsGroupField, FormButton } from '@/components';
import type { ValidatePasswordResetTokenForm } from '@/types';
import { handleFormikApiError } from '@/utils';
import { Form, Formik, type FormikHelpers } from 'formik';
import { useNotifications } from 'reapop';

type Props = {
    token: string;
    setToken: (token: string) => void;
    setIsValidToken: (isValidToken: boolean) => void;
};

export const ValidatePasswordResetTokenView = ({
    token,
    setToken,
    setIsValidToken,
}: Props) => {
    // En este caso como se pasa el token de 6 digitos como prop, se
    // define dentro de la función del componente el valor inicial
    const initialValues = {
        token,
    };

    const { notify } = useNotifications();

    const handleSubmit = async (
        values: ValidatePasswordResetTokenForm,
        { setErrors, setStatus }: FormikHelpers<ValidatePasswordResetTokenForm>,
    ) => {
        const response = await validatePasswordResetToken(values);
        if (typeof response === 'string') {
            setStatus(response);

            notify({
                message: response,
                status: 'success',
            });

            // El token se vuelve valido
            setIsValidToken(true);
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
                        <div className="flex flex-col">
                            <DigitsGroupField
                                id="token"
                                label="Ingresa el código de 6 dígitos que te enviamos a tu correo"
                                onChange={(value) => setToken(value)}
                            />
                        </div>
                        <div className="flex flex-col my-6">
                            <FormButton text="Confirmar Cuenta" type="submit" />
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};
