import { logout } from '@/api';
import { usePreferences, useProfile } from '@/hooks';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { CreditsModal } from '../Credits/CreditsModal';
import { ProfileModal } from '../Profile/ProfileModal';
import { ActionMenu } from '@/components';

export const BurgerMenuButton = () => {
    const { profile, setShowProfile } = useProfile();
    const { setShowCredits } = usePreferences();

    const buildOptions = (): {
        label: string;
        onClick?: () => void;
        to?: string;
    }[] => {
        const initialOptions = {
            label: 'Creditos del autor',
            onClick: () => {
                setShowCredits(true);
            },
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
                    setShowProfile(true);
                },
            },
            {
                label: 'Cerrar sesion',
                onClick: () => {
                    logout();
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
                options={buildOptions()}
            />
            <CreditsModal />
            <ProfileModal />
        </>
    );
};
