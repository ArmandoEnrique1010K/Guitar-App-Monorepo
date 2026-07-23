import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import NotificationsSystem, {
    useNotifications,
    setUpNotifications,
    wyboTheme,
} from 'reapop';
import { useProfile } from '@/hooks';
import { Loader } from '@/components';
import Router from './routes/router';

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
        return (
            <Loader
                label="Admira el poder de React y ToneJS"
                className="mb-5"
                height="h-screen"
            />
        );
    }

    // Evita que los clics sobre las notificaciones se propaguen al overlay
    // del modal de Radix UI, ya que el overlay podría interpretar el clic
    // como una acción para cerrar el modal.
    const handleNotificationContainerClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    // Se utiliza un Portal para renderizar las notificaciones directamente
    // en document.body y no dentro del árbol principal de la aplicación.
    //
    // ¿Por qué?
    // - Radix UI renderiza los modales usando un Portal propio con un z-index alto.
    // - Si Reapop se renderiza dentro de <Router /> o dentro del contenedor raíz,
    //   las notificaciones pueden quedar por detrás del modal debido al stacking context.
    // - Al renderizarlas en document.body, las notificaciones quedan fuera de ese
    //   contexto de apilamiento y pueden mostrarse por encima del modal.
    // - Esto evita tener que manipular z-index extremadamente altos o depender
    //   de estilos internos de Radix o Reapop.
    const notificationsPortal = createPortal(
        <div
            onClick={handleNotificationContainerClick}
            onMouseDown={handleNotificationContainerClick}
        >
            <div style={{ pointerEvents: 'auto' }}>
                {/* Las notificaciones sí pueden recibir eventos del mouse */}
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
            {/* Portal global de notificaciones */}
            {notificationsPortal}

            {/* Enrutador principal de la aplicación */}
            <Router />
        </>
    );
}
