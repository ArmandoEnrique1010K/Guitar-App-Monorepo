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

// Valor inicial de los campos del formulario
const initialValues = {
    token: '',
};

export const ConfirmAccountPage = () => {
    const { notify } = useNotifications();
    const navigate = useNavigate();

    // Función auxiliar para ejecutarla cuando se envia el formulario
    const handleSubmit = async (
        values: ConfirmAccountForm,
        { setErrors, setStatus }: FormikHelpers<ConfirmAccountForm>,
    ) => {
        // Se obtiene la respuesta de la API
        const response = await confirmAccount(values);

        // Normalmente en todos los endpoints relacionados a AUTH van a devolver una
        // respuesta de tipo string si la respuesta es exitosa
        if (typeof response === 'string') {
            setStatus(response);

            // Muestra una notificación
            notify({
                message: response,
                status: 'success',
            });

            // Redirige a la página para iniciar sesión
            navigate('/auth');
        } else {
            // Si la respuesta es un objeto de error, entonces se ejecuta la
            // siguiente función
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

            {/* Formulario con formik */}
            {/* Recordar que cada vez que interactuas con el formulario, ya sea como escribir un
            solo caracter, se vuelve a renderizar todo el formulario aunque no lo notes */}
            <Formik
                // Valores iniciales
                initialValues={initialValues}
                // Se ejecuta la función al enviar el formulario
                onSubmit={handleSubmit}
                // `validateOnBlur` indica si se va a validar el formulario cuando el usuario saca
                // el foco de un campo de entrada. Por defecto es `true`.
                // Es útil cuando quieres que se realice la validación a medida que el usuario está
                // ingresando los datos.
                validateOnBlur={false}
                // `validateOnChange` indica si se va a validar el formulario cuando se modifica un
                // campo de entrada. Por defecto es `true`.
                // Es útil cuando quieres que se realice la validación a medida que el usuario está
                // ingresando los datos.
                validateOnChange={false}
                // `validateOnMount` indica si se va a validar el formulario cuando se monta el
                // componente. Por defecto es `true`.
                // Es útil cuando quieres que se realice la validación al inicio del componente,
                // antes de que el usuario haya ingresado ningún dato.
                validateOnMount={false}
            >
                {() => (
                    <Form
                        className="w-full flex flex-col"
                        // Desactiva validaciones que vienen por defecto en los campos del formulario
                        noValidate
                        // Desactiva el autocompletado de todos los campos
                        autoComplete="off"
                    >
                        <div className="flex flex-col">
                            {/* Renderiza el campo para escribir los 6 digitos */}
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
