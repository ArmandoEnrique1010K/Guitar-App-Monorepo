import { getUser } from '@/api';
import type { User } from '@/types';
import { isErrorResponse, sleep } from '@/utils';
import type { StateCreator } from 'zustand';

export type ProfileSliceType = {
    isLoading: boolean;
    profile: User | null;
    showProfileModal: boolean;
    getProfile: () => Promise<void>;
    openProfileModal: () => void;
    closeProfileModal: () => void;
};

export const profileSlice: StateCreator<ProfileSliceType> = (set, get) => ({
    isLoading: false,
    profile: null,
    showProfileModal: false,

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

    openProfileModal: () => {
        set({ showProfileModal: true });
    },

    closeProfileModal: () => {
        set({ showProfileModal: false });
    },
});
