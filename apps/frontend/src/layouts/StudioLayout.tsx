import { MenuNavbar } from '@/views/Studio/Header/MenuNavbar';
import { Outlet } from 'react-router-dom';

export const StudioLayout = () => {
    return (
        <>
            <div className="flex flex-col h-screen">
                <MenuNavbar />
                {/* TODO: DEBE GUARDAR LA SESION ACTUAL DEL USUARIO EN ZUSTAND */}
                <div className="bg-amber-200 w-full flex-1">
                    <Outlet />
                </div>
            </div>
        </>
    );
};
