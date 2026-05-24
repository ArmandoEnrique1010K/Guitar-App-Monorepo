import { api } from '@/lib/axios';
import { isAxiosError } from 'axios';

export const getAllNoteSamples = async (guitarId: string) => {
    try {
        const url = `/noteSample/guitar/${guitarId}`;
        const { data } = await api.get(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
        throw error;
    }
};
