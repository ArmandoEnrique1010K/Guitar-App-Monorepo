import { useAppStore } from '@/store';

export const useProfile = () => {
    const isLoading = useAppStore((state) => state.isLoading);
    const profile = useAppStore((state) => state.profile);
    const showProfileModal = useAppStore((state) => state.showProfileModal);
    const showEditProfileModal = useAppStore(
        (state) => state.showEditProfileModal,
    );
    const showUpdatePasswordModal = useAppStore(
        (state) => state.showUpdatePasswordModal,
    );
    const getProfile = useAppStore((state) => state.getProfile);
    const toggleProfileModal = useAppStore((state) => state.toggleProfileModal);
    const toggleEditProfileModal = useAppStore(
        (state) => state.toggleEditProfileModal,
    );
    const editProfile = useAppStore((state) => state.editProfile);

    const toggleUpdatePasswordModal = useAppStore(
        (state) => state.toggleUpdatePasswordModal,
    );
    const updatePassword = useAppStore((state) => state.updatePassword);

    return {
        isLoading,
        profile,
        showProfileModal,
        showEditProfileModal,
        showUpdatePasswordModal,
        getProfile,
        toggleProfileModal,
        toggleEditProfileModal,
        editProfile,
        toggleUpdatePasswordModal,
        updatePassword,
    };
};
