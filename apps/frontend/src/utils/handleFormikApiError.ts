import type { ErrorResponseWithFields } from '@/types';
import type { FormikErrors, FormikHelpers } from 'formik';

interface BackendValidationError {
    path: string;
    msg: string;
}

interface HandleFormikApiErrorParams<T> {
    response: ErrorResponseWithFields;
    setErrors: FormikHelpers<T>['setErrors'];
    setStatus?: FormikHelpers<T>['setStatus'];
    notify: ({
        message,
        status,
    }: {
        message: string;
        status: 'success' | 'error';
    }) => void;
}

export const handleFormikApiError = <T>({
    response,
    setErrors,
    setStatus,
    notify,
}: HandleFormikApiErrorParams<T>) => {
    // Si la respuesta tiene
    if (response.errors) {
        const handleFormikApiError: Record<string, string> = {};

        response.errors.forEach((err: BackendValidationError) => {
            handleFormikApiError[err.path] = err.msg;
        });

        setErrors(handleFormikApiError as FormikErrors<T>);
    }

    // ERROR GENERAL
    if (response.error) {
        setStatus?.(response.error);

        notify({
            message: response.error,
            status: 'error',
        });
    }
};
