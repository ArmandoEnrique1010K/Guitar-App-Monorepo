import { api } from '@/lib/axios';
import type { ErrorResponse, Guitar } from '@/types';
import { isAxiosError } from 'axios';

export const getAllGuitars = async (): Promise<Guitar[] | ErrorResponse> => {
    try {
        const url = `/guitar`;
        const { data } = await api.get(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw error;
    }
};
