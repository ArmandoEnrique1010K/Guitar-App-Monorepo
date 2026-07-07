import type { ErrorResponseWithFields } from '@/types';
import type { FormikErrors, FormikHelpers } from 'formik';

interface BackendValidationError {
    path: string;
    msg: string;
}

// Recordar que el tipado de una respuesta de error tiene el siguiente formato
// type ErrorResponseWithFields = {
//     errors?: Error[];
//     error?: string;
// }

interface HandleFormikApiErrorParams<T> {
    response: ErrorResponseWithFields;
    setErrors: FormikHelpers<T>['setErrors'];
    setStatus?: FormikHelpers<T>['setStatus'];
    notify: ({ message, status }: { message: string; status: 'error' }) => void;
}

// Función encargada de gestionar un mensaje de error obtenido luego de hacer
// una petición a la API
export const handleFormikApiError = <T>({
    response,
    setErrors,
    setStatus,
    notify,
}: HandleFormikApiErrorParams<T>) => {
    // Si la respuesta tiene el campo errors significa que hay errores asociados
    // a cada uno de los campos del formulario
    if (response.errors) {
        const handleFormikApiError: Record<string, string> = {};

        // Añade el nombre del campo (key) y el mensaje de error (value) en un
        // nuevo objeto y se pasa como los errores del formulario de Formik
        response.errors.forEach((err: BackendValidationError) => {
            handleFormikApiError[err.path] = err.msg;
        });

        setErrors(handleFormikApiError as FormikErrors<T>);
    }

    // El campo error significa que hay un unico error generico, que se puede mostrar
    // en una notificación
    if (response.error) {
        setStatus?.(response.error);

        notify({
            message: response.error,
            status: 'error',
        });
    }
};
