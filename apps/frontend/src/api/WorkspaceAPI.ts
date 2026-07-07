import { api } from '@/lib/axios';
import type {
    ErrorResponse,
    Workspace,
    WorkspaceSummary,
    WorkspaceForm,
    ErrorResponseWithFields,
} from '@/types';
import { isAxiosError } from 'axios';

export const createWorkspace = async (
    formData: WorkspaceForm,
): Promise<Workspace | ErrorResponseWithFields> => {
    try {
        const url = '/workspace';
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw error;
        }
        throw error;
    }
};

export const getAllWorkspaces = async (): Promise<
    Workspace[] | ErrorResponse
> => {
    try {
        const url = '/workspace';
        const { data } = await api.get(url);
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
): Promise<WorkspaceSummary | ErrorResponseWithFields> => {
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

export const deleteWorkspace = async (
    workspaceId: string,
): Promise<void | ErrorResponse> => {
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
