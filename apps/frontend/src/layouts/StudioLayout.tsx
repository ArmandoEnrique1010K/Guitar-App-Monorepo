import { MenuNavbar } from '@/views/Studio/Header/MenuNavbar';
import { Outlet } from 'react-router-dom';

export const StudioLayout = () => {
    return (
        <>
            <div className="flex flex-col h-screen">
                <MenuNavbar />
                {/* TODO: DEBE GUARDAR LA SESION ACTUAL DEL USUARIO EN ZUSTAND */}
                <div className="w-full flex-1 min-h-0">
                    <Outlet />
                </div>
            </div>
        </>
    );
};
