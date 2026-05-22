import { AxiosError } from 'axios';
import type { FormikErrors, FormikHelpers } from 'formik';

interface BackendValidationError {
    path: string;
    msg: string;
}

interface BackendErrorResponse {
    errors?: BackendValidationError[];
    error?: string;
}

interface HandleFormikApiErrorParams<T> {
    error: unknown;
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
    error,
    setErrors,
    setStatus,
    notify,
}: HandleFormikApiErrorParams<T>) => {
    const axiosError = error as AxiosError<BackendErrorResponse>;

    const data = axiosError.response?.data;
    console.log(data);

    if (!data) return;

    // VALIDACIONES
    if (data.errors) {
        const formikErrors: Record<string, string> = {};

        data.errors.forEach((err: BackendValidationError) => {
            formikErrors[err.path] = err.msg;
        });

        setErrors(formikErrors as FormikErrors<T>);
    }

    // ERROR GENERAL
    if (data.error) {
        setStatus?.(data.error);

        notify({
            message: data.error,
            status: 'error',
        });
    }
};
