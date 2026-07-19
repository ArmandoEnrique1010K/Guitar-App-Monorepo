import { useEffect } from 'react';
import { useProfile } from './hooks';
import Router from './routes/router';
import NotificationsSystem, {
    useNotifications,
    setUpNotifications,
    wyboTheme,
} from 'reapop';
import { Loader } from './components';
import { createPortal } from 'react-dom';

export default function App() {
    // Obtiene el listado de notificaciones activas y la función para cerrarlas.
    const { notifications, dismissNotification } = useNotifications();

    // Estado y acción relacionados con el usuario autenticado.
    const { isLoading, getProfile } = useProfile();

    useEffect(() => {
        // Configura el comportamiento por defecto de todas las notificaciones.
        setUpNotifications({
            defaultProps: {
                position: 'top-right',
                dismissAfter: 5000,
                dismissible: true,
                showDismissButton: true,
                closeButton: true,
            },
        });

        // Al iniciar la aplicación intenta obtener el perfil del usuario.
        // Si existe una sesión activa, el estado global será actualizado.
        getProfile();
    }, []);

    // Mientras se verifica si existe una sesión iniciada, se muestra una
    // pantalla de carga para evitar renderizar la aplicación prematuramente.
    if (isLoading) {
        return <Loader />;
    }

    // Función para manejar clics en el contenedor de notificaciones
    const handleNotificationContainerClick = (e) => {
        // Detener la propagación para que no cierre el modal
        e.stopPropagation();
    };

    // Renderizar notificaciones en el body
    const notificationsPortal = createPortal(
        <div
            onClick={handleNotificationContainerClick}
            onMouseDown={handleNotificationContainerClick} // También prevenir mousedown
            style={{
                position: 'relative',
                zIndex: 999999,
                pointerEvents: 'none', // Permitir clics solo en las notificaciones
            }}
        >
            <div style={{ pointerEvents: 'auto' }}>
                {/* Las notificaciones sí son clicables */}
                <NotificationsSystem
                    notifications={notifications}
                    dismissNotification={(id) => dismissNotification(id)}
                    theme={wyboTheme}
                />
            </div>
        </div>,
        document.body,
    );

    return (
        <>
            {notificationsPortal}
            <Router />
        </>
    );

    // return (
    //     <div className="">
    //         {/* Sistema global encargado de renderizar las notificaciones */}
    //         <NotificationsSystem
    //             notifications={notifications}
    //             // Permite cerrar manualmente la notificación
    //             dismissNotification={(id) => dismissNotification(id)}
    //             theme={wyboTheme}
    //         />

    //         {/* Enrutador principal de la aplicación */}
    //         <Router />
    //     </div>
    // );
}
