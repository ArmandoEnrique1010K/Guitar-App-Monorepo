import { api } from '@/lib/axios';
import type {
    LoginForm,
    CreateAccountForm,
    ConfirmAccountForm,
    RequestCodeForm,
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
