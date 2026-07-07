import { getUser } from '@/api';
import type { User } from '@/types';
import type { StateCreator } from 'zustand';

export type ProfileSliceType = {
    profile: User | null;
    isLoading: boolean;
    error: string | null;

    getProfile: () => Promise<void>;
    cleanProfile: () => void;

    showProfile: boolean;
    setShowProfile: (showProfile: boolean) => void;
};

export const profileSlice: StateCreator<ProfileSliceType> = (set, get) => ({
    profile: null,
    isLoading: false,
    error: null,

    getProfile: async () => {
        // Evita hacer la petición si ya existe el perfil
        if (get().profile) return;

        try {
            set({
                isLoading: true,
                error: null,
            });

            const data = await getUser();

            // Si se tiene la propiedad 'error' en la respuesta
            if ('error' in data) {
                // console.log(data.error);
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
                error: 'Error obteniendo perfil',
            });
        } finally {
            set({
                isLoading: false,
            });
        }
    },

    cleanProfile: () => {
        localStorage.removeItem('AUTH_TOKEN');

        set({
            profile: null,
            error: null,
        });
    },

    showProfile: false,
    setShowProfile: (showProfile) => {
        set({ showProfile });
    },
});
