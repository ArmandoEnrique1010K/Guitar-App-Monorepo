import { useNavigate } from 'react-router-dom';
import { useNotifications } from 'reapop';
import { Form, Formik, type FormikHelpers } from 'formik';
import { handleFormikApiError } from '@/utils';
import {
    AuthTitle,
    FormButton,
    SecondaryText,
    DigitsGroupField,
} from '@/components';
import type { ConfirmAccountForm } from '@/types';
import { confirmAccount } from '@/api';

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
        const response = await confirmAccount(values);

        if (typeof response === 'string') {
            setStatus(response);

            notify({
                message: response,
                status: 'success',
            });
            navigate('/auth');
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
            <AuthTitle title="Confirma tu cuenta" />

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
                text="Necesitas un nuevo código."
                linkText="Solicítalo aquí"
                link="/auth/request-code"
            />
        </>
    );
};
