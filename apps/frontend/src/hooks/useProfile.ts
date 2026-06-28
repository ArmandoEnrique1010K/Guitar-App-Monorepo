import { useAppStore } from '@/store';

export const useProfile = () => {
    const profile = useAppStore((state) => state.profile);
    const isLoading = useAppStore((state) => state.isLoading);
    const error = useAppStore((state) => state.error);
    const getProfile = useAppStore((state) => state.getProfile);
    const cleanProfile = useAppStore((state) => state.cleanProfile);
    const setProfile = useAppStore((state) => state.setProfile);
    const showProfile = useAppStore((state) => state.showProfile);
    const setShowProfile = useAppStore((state) => state.setShowProfile);

    return {
        profile,
        isLoading,
        error,
        getProfile,
        cleanProfile,
        setProfile,
        showProfile,
        setShowProfile,
    };
};
