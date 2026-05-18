import { Link } from 'react-router-dom';
import { LogoGuitar } from '@/components/LogoGuitar';

export const NavMenu = () => {
    return (
        <>
            <div className="flex flex-row justify-between items-center bg-gray-200 px-12 py-2">
                <LogoGuitar size="small" />
                <div className="flex flex-row gap-4">
                    <Link to="/auth/register" className="hover:text-green-600">
                        Registrarse
                    </Link>
                    <Link to="/auth" className="hover:text-green-600">
                        Iniciar sesión
                    </Link>
                </div>
            </div>
        </>
    );
};
