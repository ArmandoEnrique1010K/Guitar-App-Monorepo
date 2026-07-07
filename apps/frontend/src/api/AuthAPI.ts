import { api } from '@/lib/axios';
import type {
    ErrorResponseWithFields,
    LoginForm,
    CreateAccountForm,
    ConfirmAccountForm,
    RequestConfirmationCodeForm,
    RequestPasswordResetForm,
    ValidatePasswordResetTokenForm,
    ResetPasswordForm,
} from '@/types';
import { isAxiosError } from 'axios';

// A diferencia de AssistantAPI, aqui se definen las funciones que van a realizar las peticiones HTTP
// a la API REST y se manejan los errores de una manera especifica

// Se utiliza el mismo nombre de la funciones definidas en el controlador respectivo del backend

// Esto es una mala practica
// export const createAccount = async (formData: CreateAccountForm) => {
//     const response = await api.post('/auth/create-account', formData);
//     return response.data;
// };

// Esto es una buena practica
export const createAccount = async (
    formData: CreateAccountForm,
): Promise<string | ErrorResponseWithFields> => {
    try {
        // URL base
        const url = '/auth/create-account';
        // Obtiene la respuesta devuelta por la API
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        // De esta forma se maneja el mensaje de error devuelto
        if (isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw error;
    }
};

export const confirmAccount = async (
    formData: ConfirmAccountForm,
): Promise<string | ErrorResponseWithFields> => {
    try {
        const url = '/auth/confirm-account';
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw error;
    }
};

export const login = async (
    formData: LoginForm,
): Promise<string | ErrorResponseWithFields> => {
    try {
        const url = '/auth/login';
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw error;
    }
};

export const requestConfirmationCode = async (
    formData: RequestConfirmationCodeForm,
): Promise<string | ErrorResponseWithFields> => {
    try {
        const url = '/auth/request-confirmation-code';
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw error;
    }
};

export const requestPasswordReset = async (
    formData: RequestPasswordResetForm,
): Promise<string | ErrorResponseWithFields> => {
    try {
        const url = '/auth/request-password-reset';
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw error;
    }
};

export const validatePasswordResetToken = async (
    formData: ValidatePasswordResetTokenForm,
): Promise<string | ErrorResponseWithFields> => {
    try {
        const url = '/auth/validate-password-reset-token';
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw error;
    }
};

export const resetPassword = async (
    token: string,
    formData: ResetPasswordForm,
): Promise<string | ErrorResponseWithFields> => {
    try {
        const url = `/auth/reset-password/${token}`;
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw error;
    }
};

export const logout = async (): Promise<string> => {
    try {
        const url = '/auth/logout';
        const { data } = await api.post(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw error;
    }
};
