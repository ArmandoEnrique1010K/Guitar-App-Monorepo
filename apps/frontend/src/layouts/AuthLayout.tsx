import { LogoGuitar } from '@/components';
import { Link, Outlet } from 'react-router-dom';

export const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-black">
            <div className="flex flex-col gap-4 align-center justify-center items-center sm:py-10">
                <Link
                    to={'/'}
                    className="flex flex-col align-center justify-center items-center gap-4 sm:p-0 pt-4"
                >
                    <LogoGuitar size="large" />
                    <h1 className="sm:text-4xl text-3xl font-shockwave text-green-500">
                        Guitar App 2
                    </h1>
                </Link>

                {/* Elimine la fuente 'font-roboto' */}
                <div className="shadow-lg  sm:rounded-xl sm:p-6 p-4 bg-white flex flex-col items-center justify-center sm:min-w-md min-w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
