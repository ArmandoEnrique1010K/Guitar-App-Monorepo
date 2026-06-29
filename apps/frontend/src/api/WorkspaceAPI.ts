import { api } from '@/lib/axios';
import type { WorkspaceForm } from '@/schemas';
import { isAxiosError } from 'axios';

export const createWorkspace = async (formData: WorkspaceForm) => {
    try {
        const url = '/workspace';
        const { data } = await api.post<Workspace>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
        throw error;
    }
};
export interface Workspace {
    _id: string;
    name: string;
    presetCount: number;
}

export const getAllWorkspaces = async () => {
    try {
        const url = '/workspace';
        const { data } = await api.get<Workspace[]>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
        throw error;
    }
};

export const updateWorkspace = async (
    workspaceId: string,
    formData: WorkspaceForm,
) => {
    try {
        const url = `/workspace/${workspaceId}`;
        const { data } = await api.put(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
        throw error;
    }
};

export const deleteWorkspace = async (workspaceId: string) => {
    try {
        const url = `/workspace/${workspaceId}`;
        const { data } = await api.delete(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
        throw error;
    }
};
