import { api } from '@/lib/axios';
import type { PresetForm } from '@/schemas';
import { isAxiosError } from 'axios';

export const createPreset = async (
    workspaceId: string,
    guitarId: string,
    formData: PresetForm,
) => {
    try {
        const url = `/preset/workspace/${workspaceId}/guitar/${guitarId}`;
        const { data } = await api.post<Preset>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
        throw error;
    }
};

export type Preset = PresetForm & { _id: string; guitar: string };

export const getAllPresets = async (workspaceId: string) => {
    try {
        const url = `/preset/workspace/${workspaceId}`;
        const { data } = await api.get<Preset[]>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
        throw error;
    }
};
