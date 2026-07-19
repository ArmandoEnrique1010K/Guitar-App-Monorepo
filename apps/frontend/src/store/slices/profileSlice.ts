import { getUser, updatePassword, updateProfile } from '@/api';
import type { ErrorResponse, ErrorResponseWithFields, User } from '@/types';
import { isErrorResponse, sleep } from '@/utils';
import type { StateCreator } from 'zustand';

export type ProfileSliceType = {
    isLoading: boolean;
    profile: User | null;
    showProfileModal: boolean;
    showEditProfileModal: boolean;
    showUpdatePasswordModal: boolean;
    getProfile: () => Promise<void>;
    toggleProfileModal: () => void;
    toggleEditProfileModal: () => void;
    editProfile: ({
        name,
        email,
    }) => string | ErrorResponseWithFields | ErrorResponse;
    toggleUpdatePasswordModal: () => void;
    updatePassword: ({
        current_password,
        password,
        password_confirmation,
    }) => string | ErrorResponseWithFields | ErrorResponse;
};

export const profileSlice: StateCreator<ProfileSliceType> = (set, get) => ({
    isLoading: false,
    profile: null,
    showProfileModal: false,
    showEditProfileModal: false,
    showUpdatePasswordModal: false,

    getProfile: async () => {
        // Evita hacer la petición si ya existe el perfil
        if (get().profile) return;

        try {
            set({
                isLoading: true,
            });

            // Retraso de 1.5 segundos
            await sleep(1500);

            const data = await getUser();

            // Si se tiene la propiedad 'error' en la respuesta, detiene la ejecución
            if (isErrorResponse(data)) {
                set({
                    profile: null,
                });
                return;
            }

            set({
                profile: data,
            });
        } catch (error) {
            set({
                profile: null,
            });

            console.log(error);
        } finally {
            set({
                isLoading: false,
            });
        }
    },

    toggleProfileModal: () => {
        set({ showProfileModal: !get().showProfileModal });
    },

    toggleEditProfileModal: () => {
        set({ showEditProfileModal: !get().showEditProfileModal });
    },

    editProfile: async ({ name, email }) => {
        const response = await updateProfile({ name, email });

        if (typeof response === 'string') {
            set({
                profile: {
                    ...get().profile,
                    name: name,
                    email: email,
                },
            });
        }

        return response;
    },

    toggleUpdatePasswordModal: () => {
        set({ showUpdatePasswordModal: !get().showUpdatePasswordModal });
    },

    updatePassword: async ({
        current_password,
        password,
        password_confirmation,
    }) => {
        const response = await updatePassword({
            current_password,
            password,
            password_confirmation,
        });
        return response;
    },
});
