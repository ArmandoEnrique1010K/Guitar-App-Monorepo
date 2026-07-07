import { isAxiosError } from 'axios';
import type { ErrorResponse, ErrorResponseWithFields, User } from '@/types';
import { api } from '@/lib/axios';

export const getUser = async (): Promise<User | ErrorResponse> => {
    try {
        const url = '/profile/user';
        const { data } = await api.get(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw error;
    }
};

export const updateProfile = async (): Promise<
    string | ErrorResponseWithFields
> => {
    try {
        const url = `/profile`;
        const { data } = await api.put(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw error;
    }
};

export const updatePassword = async (): Promise<
    string | ErrorResponseWithFields
> => {
    try {
        const url = `/profile/password`;
        const { data } = await api.put(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw error;
    }
};
