import { useEffect, useState } from 'react';
import { user, type User } from '@/api';
import { handleFormikApiError } from '@/utils';

export const useProfile = () => {
    const [profile, setProfile] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getProfile = async () => {
            try {
                setIsLoading(true);

                const data = await user();

                setProfile(data);
            } catch (error) {
                handleFormikApiError({
                    error,
                    // SOLUCION TEMPORAL, DEJAR LAS FUNCIONES EN BLANCO
                    setErrors: () => {},
                    setStatus: () => {},
                    notify: () => {},
                });
                setError('Error obteniendo perfil');
            } finally {
                setIsLoading(false);
            }
        };

        getProfile();
    }, []);

    // Logout manual
    const cleanProfile = () => {
        localStorage.removeItem('AUTH_TOKEN');

        // limpiar usuario
        setProfile(null);
    };

    return {
        profile,
        isLoading,
        error,
        cleanProfile,
    };
};
