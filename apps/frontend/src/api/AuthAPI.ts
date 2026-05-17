import { api } from '../lib/axios';

export interface LoginForm {
    email: string;
    password: string;
}

export interface CreateAccountForm {
    email: string;
    password: string;
    password_confirmation: string;
    name: string;
}

// export const login = async (formData: LoginForm) => {
//     try {
//         const response = await api.post('/auth/login', formData);
//         console.log(response);
//         return response.data;
//     } catch (error) {
//         if (isAxiosError(error)) {
//             throw new Error(error.response?.data?.message || 'Error al iniciar sesión', { cause: error });
//         }
//         throw new Error('Error inesperado', { cause: error });
//     }
// };

export const login = async (formData: LoginForm) => {
    const response = await api.post('/auth/login', formData);

    return response.data;
};

export const createAccount = async (formData: CreateAccountForm) => {
    const response = await api.post('/auth/create-account', formData);

    return response.data;
};
