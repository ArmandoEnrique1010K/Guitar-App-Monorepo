import { Link } from "react-router-dom";
import { login, type LoginForm } from "../../api/AuthAPI";
import { Form, Formik, type FormikHelpers } from "formik";
import { useNotifications } from "reapop";
import { TextField } from "../../ui/Formik/TextField";
import { PasswordField } from "../../ui/Formik/PasswordField";
import { FormButton } from "../../ui/FormButton";

export const LoginPage = () => {
    const initialValues: LoginForm = {
        email: "",
        password: "",
    };
    const { notify } = useNotifications();

    const handleSubmit = async (
        values: LoginForm,
        { setErrors, setStatus }: FormikHelpers<LoginForm>,
    ) => {
        try {
            const response = await login(values);
            console.log(response);

            // LOGIN EXITOSO
            if (typeof response === "string") {
                setStatus(response);

                notify({
                    message: response,
                    status: "success",
                });
            }

            // El objeto response es string cuando el usuario ha iniciado sesion
        } catch (error) {
            const data = error.response.data;
            console.log(data);

            // VALIDACIONES
            if (data.errors) {
                const formikErrors: Record<string, string> = {};

                data.errors.forEach((err: { path: string; msg: string }) => {
                    formikErrors[err.path] = err.msg;
                });

                setErrors(formikErrors);
            }

            // ERROR GENERAL
            if (data.error) {
                setStatus(data.error);

                notify({
                    message: data.error,
                    status: "error",
                });
            }
        }
    };

    return (
        <>
            <h2 className="text-3xl font-light text-center text-black pb-4">
                Login
            </h2>

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
                    <Form className="w-full flex flex-col gap-6" noValidate autoComplete="off">
                        <TextField
                            id="email"
                            label="Correo"
                            placeholder="Correo del usuario"
                            type="email"
                        />

                        <PasswordField
                            id="password"
                            label="Contraseña"
                            placeholder="********"
                        />

                        <FormButton text="Iniciar Sesión" type="submit" />

                    </Form>
                )}
            </Formik>

            <p className="text-sm text-center text-gray-500 mt-4">
                ¿No tienes cuenta?{" "}
                <Link to="/register" className="text-green-500 hover:underline">
                    Regístrate aquí
                </Link>
            </p>
        </>
    );
};
