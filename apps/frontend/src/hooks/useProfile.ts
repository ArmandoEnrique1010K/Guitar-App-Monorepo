import { useAppStore } from '@/store';

export const useProfile = () => {
    const isLoading = useAppStore((state) => state.isLoading);
    const profile = useAppStore((state) => state.profile);
    const showProfileModal = useAppStore((state) => state.showProfileModal);
    const getProfile = useAppStore((state) => state.getProfile);
    const openProfileModal = useAppStore((state) => state.openProfileModal);
    const closeProfileModal = useAppStore((state) => state.closeProfileModal);

    return {
        isLoading,
        profile,
        showProfileModal,
        getProfile,
        openProfileModal,
        closeProfileModal,
    };
};
