import { useEffect } from 'react';
import { useProfile } from './hooks';
import Router from './routes/router';
import NotificationsSystem, {
    useNotifications,
    setUpNotifications,
    wyboTheme,
} from 'reapop';

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
        return <div>Cargando...</div>;
    }

    return (
        <>
            {/* Sistema global encargado de renderizar las notificaciones */}
            <NotificationsSystem
                notifications={notifications}
                // Permite cerrar manualmente la notificación
                dismissNotification={(id) => dismissNotification(id)}
                theme={wyboTheme}
            />

            {/* Enrutador principal de la aplicación */}
            <Router />
        </>
    );
}
