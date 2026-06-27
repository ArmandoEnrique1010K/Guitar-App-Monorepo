import { logout } from '@/api';
import { usePreferences, useProfile } from '@/hooks';
import { Menu } from '@ark-ui/react/menu';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Link, useNavigate } from 'react-router-dom';
import { CreditsModal } from '../Credits/CreditsModal';

export const BurgerMenuButton = () => {
    const { profile } = useProfile();
    const { setShowCredits } = usePreferences();
    const navigate = useNavigate();

    return (
        <>
            <Menu.Root>
                <Menu.Trigger className="flex items-center justify-center cursor-pointer">
                    <HamburgerMenuIcon
                        className="
                        size-8  
                        text-amber-200 hover:text-amber-300
                    "
                    />
                </Menu.Trigger>
                <Menu.Positioner>
                    <Menu.Content className="min-w-44 z-30 border border-gray-200 bg-white shadow-xl outline-none focus:outline-none focus-visible:outline-none flex flex-col">
                        <Menu.Item
                            value="Creditos-del-autor"
                            className="px-3 py-2 text-sm hover:bg-[#0000ff] hover:text-white cursor-pointer outline-none"
                            onClick={() => {
                                setShowCredits(true);
                            }}
                        >
                            Creditos del autor
                        </Menu.Item>

                        {profile ? (
                            <>
                                <Menu.Item
                                    value="Mi-perfil"
                                    className="px-3 py-2 text-sm hover:bg-[#0000ff] hover:text-white cursor-pointer outline-none"
                                    onClick={() => {}}
                                >
                                    Mi perfil
                                </Menu.Item>
                                <Menu.Item
                                    value="Cerrar-sesion"
                                    className="px-3 py-2 text-sm hover:bg-[#0000ff] hover:text-white cursor-pointer outline-none"
                                    onClick={() => {
                                        logout();
                                        navigate('/auth');
                                    }}
                                >
                                    Cerrar sesion
                                </Menu.Item>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/auth"
                                    className="px-3 py-2 text-sm hover:bg-[#0000ff] hover:text-white cursor-pointer outline-none"
                                >
                                    Iniciar sesión
                                </Link>
                                <Link
                                    to="/auth/register"
                                    className="px-3 py-2 text-sm hover:bg-[#0000ff] hover:text-white cursor-pointer outline-none"
                                >
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </Menu.Content>
                </Menu.Positioner>
            </Menu.Root>
            <CreditsModal />
        </>
    );
};
