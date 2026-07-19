import { logout } from '@/api';
import { useCredits, useProfile } from '@/hooks';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { ActionMenu } from '@/components';
import {
    CreditsModal,
    EditProfileModal,
    ProfileModal,
    UpdatePasswordModal,
} from '@/views';

export const BurgerMenuButton = () => {
    const {
        profile,
        toggleProfileModal,
        toggleEditProfileModal,
        toggleUpdatePasswordModal,
    } = useProfile();
    const { toggleCreditsModal } = useCredits();

    const buildOptions = (): {
        label: string;
        onClick?: () => void;
        to?: string;
    }[] => {
        const initialOptions = {
            label: 'Creditos del autor',
            onClick: () => toggleCreditsModal(),
        };

        if (profile) {
            return [initialOptions, ...buildProfileOptions()];
        } else {
            return [initialOptions, ...buildIsNotLoggedOptions()];
        }
    };

    const buildProfileOptions = () => {
        return [
            {
                label: 'Mi perfil',
                onClick: () => {
                    toggleProfileModal();
                },
            },
            {
                label: 'Editar Perfil',
                onClick: () => {
                    toggleEditProfileModal();
                },
            },
            {
                label: 'Cambio de contraseña',
                onClick: () => {
                    toggleUpdatePasswordModal();
                },
            },
            {
                label: 'Cerrar sesion',
                onClick: () => {
                    logout();

                    // Recarga toda la página
                    window.location.reload();
                },
            },
        ];
    };

    const buildIsNotLoggedOptions = () => {
        return [
            {
                label: 'Iniciar sesion',
                to: '/auth',
            },
            {
                label: 'Registrarse',
                to: '/auth/register',
            },
        ];
    };

    return (
        <>
            <ActionMenu
                icon={
                    <HamburgerMenuIcon
                        className="
                        size-8  
                        text-amber-200 hover:text-amber-300
                    "
                    />
                }
                width="min-w-44"
                options={buildOptions()}
            />
            <CreditsModal />
            <ProfileModal />
            <EditProfileModal />
            <UpdatePasswordModal />
        </>
    );
};
