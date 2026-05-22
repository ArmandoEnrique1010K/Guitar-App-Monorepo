import { NavMenu } from '@/views/Menu/NavMenu';

export const GuitarLayout = () => {
    return (
        <>
            <NavMenu />
            {/* TODO: DEBE GUARDAR LA SESION ACTUAL DEL USUARIO EN ZUSTAND */}
            <div>GuitarLayout</div>
        </>
    );
};
