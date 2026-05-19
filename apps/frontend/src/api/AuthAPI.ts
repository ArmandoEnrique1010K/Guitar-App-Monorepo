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

export const login = async (formData: LoginForm) => {
    const response = await api.post('/auth/login', formData);
    return response.data;
};

export const createAccount = async (formData: CreateAccountForm) => {
    const response = await api.post('/auth/create-account', formData);
    return response.data;
};

export const confirmAccount = async (formData: ConfirmAccountForm) => {
    const response = await api.post('/auth/confirm-account', formData);
    return response.data;
};

export const requestCode = async (formData: RequestCodeForm) => {
    const response = await api.post('/auth/request-code', formData);
    return response.data;
};

export const forgotPassword = async (formData: ForgotPasswordForm) => {
    const response = await api.post('/auth/forgot-password', formData);
    return response.data;
};
export const validateToken = async (formData: ValidateTokenForm) => {
    const response = await api.post('/auth/validate-token', formData);
    return response.data;
};
export const updatePasswordWithToken = async (
    token: string,
    formData: UpdatePasswordForm,
) => {
    const response = await api.post(`/auth/update-password/${token}`, formData);
    return response.data;
};

export const logout = async () => {
    const response = await api.post('/auth/logout');
    return response.data;
};

export interface User {
    id: string;
    name: string;
    email: string;
}

// Obtener el perfil del usuario
export const user = async () => {
    const response = await api.get<User>('/profile/user');
    return response.data;
};
