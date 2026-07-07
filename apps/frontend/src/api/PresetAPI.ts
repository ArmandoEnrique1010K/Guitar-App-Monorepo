import { api } from '@/lib/axios';
import type {
    ErrorResponse,
    ErrorResponseWithFields,
    Preset,
    PresetForm,
} from '@/types';
import { isAxiosError } from 'axios';

export const createPreset = async (
    workspaceId: string,
    guitarId: string,
    formData: PresetForm,
): Promise<PresetForm | ErrorResponseWithFields> => {
    try {
        const url = `/preset/workspace/${workspaceId}/guitar/${guitarId}`;
        const { data } = await api.post<PresetForm>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
        throw error;
    }
};

export const getAllPresets = async (
    workspaceId: string,
): Promise<Preset[] | ErrorResponse> => {
    try {
        const url = `/preset/workspace/${workspaceId}`;
        const { data } = await api.get(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
        throw error;
    }
};

export const updatePreset = async (
    presetId: string,
    guitarId: string,
    formData: PresetForm,
): Promise<Preset | ErrorResponseWithFields> => {
    try {
        const url = `/preset/${presetId}/guitar/${guitarId}`;
        const { data } = await api.put(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
        throw error;
    }
};

export const deletePreset = async (
    presetId: string,
): Promise<void | ErrorResponse> => {
    try {
        const url = `/preset/${presetId}`;
        const { data } = await api.delete(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
        throw error;
    }
};
