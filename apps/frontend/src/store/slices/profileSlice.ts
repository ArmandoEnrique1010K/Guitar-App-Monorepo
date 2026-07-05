import { getUser, type User } from '@/api';
import type { StateCreator } from 'zustand';

export type ProfileSliceType = {
    profile: User | null;
    isLoading: boolean;
    error: string | null;

    getProfile: () => Promise<void>;
    cleanProfile: () => void;
    setProfile: (profile: User | null) => void;

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

            set({
                profile: data,
            });
        } catch (error) {
            // handleFormikApiError({
            //     // TODO: SOLUCION TEMPORAL, DEJAR LAS FUNCIONES EN BLANCO
            //     error,
            //     setErrors: () => {},
            //     setStatus: () => {},
            //     notify: () => {},
            // });

            // console.error(error);
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

    setProfile: (profile) => {
        set({ profile });
    },

    showProfile: false,
    setShowProfile: (showProfile) => {
        set({ showProfile });
    },
});
