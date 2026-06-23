import { validateToken } from '@/api/AuthAPI';
import { DigitsGroupField } from '@/components/Auth/DigitsGroupField';
import type { ValidateTokenForm } from '@/schemas';
import { FormButton } from '@/components/Auth/FormButton';
import { handleFormikApiError } from '@/utils/handleFormikApiError';
import { Form, Formik, type FormikHelpers } from 'formik';
import { useNotifications } from 'reapop';

type Props = {
    token: string;
    setToken: (token: string) => void;
    setIsValidToken: (isValidToken: boolean) => void;
};

export const TokenFormView = ({ token, setToken, setIsValidToken }: Props) => {
    const initialValues = {
        token,
    };

    const { notify } = useNotifications();

    const handleSubmit = async (
        values: ValidateTokenForm,
        { setErrors, setStatus }: FormikHelpers<ValidateTokenForm>,
    ) => {
        try {
            const response = await validateToken(values);
            if (typeof response === 'string') {
                setStatus(response);

                notify({
                    message: response,
                    status: 'success',
                });

                setIsValidToken(true);
            }
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
