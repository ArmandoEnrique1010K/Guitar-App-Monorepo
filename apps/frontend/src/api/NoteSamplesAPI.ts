import { api } from '@/lib/axios';
import type { NoteSample, ErrorResponse } from '@/types';
import { isAxiosError } from 'axios';

export const getAllNoteSamples = async (
    guitarId: string,
): Promise<NoteSample[] | ErrorResponse> => {
    try {
        const url = `/noteSample/guitar/${guitarId}`;
        const { data } = await api.get(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw error;
    }
};
