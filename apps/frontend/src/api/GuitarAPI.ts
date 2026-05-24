import { api } from '@/lib/axios';
import { isAxiosError } from 'axios';

export const getAllGuitars = async () => {
    try {
        const url = `/guitar`;
        const { data } = await api.get(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
        throw error;
    }
};
