import { useNavigate } from 'react-router-dom';
import { useNotifications } from 'reapop';
import { Form, Formik, type FormikHelpers } from 'formik';
import { handleFormikApiError } from '@/utils/handleFormikApiError';
import { AuthTitle } from '@/components/Auth/AuthTitle';
import { FormButton } from '@/ui/FormButton';
import { DigitsGroupField } from '@/components/Auth/DigitsGroupField';
import { SecondaryText } from '@/components/Auth/SecondaryText';
import type { ConfirmAccountForm } from '@/schemas';
import { confirmAccount } from '@/api/AuthAPI';

export const ConfirmAccountPage = () => {
    const initialValues = {
        token: '',
    };

    const { notify } = useNotifications();
    const navigate = useNavigate();

    const handleSubmit = async (
        values: ConfirmAccountForm,
        { setErrors, setStatus }: FormikHelpers<ConfirmAccountForm>,
    ) => {
        try {
            const response = await confirmAccount(values);
            if (typeof response === 'string') {
                setStatus(response);

                notify({
                    message: response,
                    status: 'success',
                });
                navigate('/login');
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
            <AuthTitle title="Confirmar Cuenta" />

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
                            />
                        </div>
                        <div className="flex flex-col my-6">
                            <FormButton text="Confirmar Cuenta" type="submit" />
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
