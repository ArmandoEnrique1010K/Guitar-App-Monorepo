import { api } from '@/lib/axios';
import type {
    LoginForm,
    CreateAccountForm,
    ConfirmAccountForm,
    RequestCodeForm,
    ForgotPasswordForm,
    ValidateTokenForm,
    UpdatePasswordForm,
} from '@/schemas';
import { isAxiosError } from 'axios';

//* ESTO ES UNA MALA PRACTICA
// export const login = async (formData: LoginForm) => {
//     const response = await api.post('/auth/login', formData);
//     return response.data;
// };

//* ESTO ES UNA BUENA PRACTICA
export const login = async (formData: LoginForm) => {
    try {
        const url = '/auth/login';
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
        throw error;
    }
};

export const createAccount = async (formData: CreateAccountForm) => {
    try {
        const url = '/auth/create-account';
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
        throw error;
    }
};

export const confirmAccount = async (formData: ConfirmAccountForm) => {
    try {
        const url = '/auth/confirm-account';
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
        throw error;
    }
};

export const requestCode = async (formData: RequestCodeForm) => {
    try {
        const url = '/auth/request-code';
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
        throw error;
    }
};

export const forgotPassword = async (formData: ForgotPasswordForm) => {
    try {
        const url = '/auth/forgot-password';
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
        throw error;
    }
};
export const validateToken = async (formData: ValidateTokenForm) => {
    try {
        const url = '/auth/validate-token';
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
        throw error;
    }
};
export const updatePasswordWithToken = async (
    token: string,
    formData: UpdatePasswordForm,
) => {
    try {
        const url = `/auth/update-password/${token}`;
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
        throw error;
    }
};

export const logout = async () => {
    try {
        const url = '/auth/logout';
        const { data } = await api.post(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
        throw error;
    }
};

export interface User {
    id: string;
    name: string;
    email: string;
}

// Obtener el perfil del usuario
export const user = async () => {
    try {
        const url = '/profile/user';
        const { data } = await api.get<User>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
        throw error;
    }
};
