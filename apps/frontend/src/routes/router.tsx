import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NotificationsSystem, {
    useNotifications,
    setUpNotifications,
    wyboTheme,
} from 'reapop';
import { AuthLayout, StudioLayout } from '@/layouts';
import {
    ConfirmAccountPage,
    ForgotPasswordPage,
    LoginPage,
    NewPasswordPage,
    RegisterPage,
    RequestCodePage,
    StudioPage,
} from '@/pages';
import { useProfile } from '@/hooks';

export default function Router() {
    const { notifications, dismissNotification } = useNotifications();
    setUpNotifications({
        defaultProps: {
            position: 'top-right',
            dismissAfter: 5000,
            dismissible: true,
            showDismissButton: true,
            closeButton: true,
        },
    });

    // Obtener perfil del usuario
    const { profile, isLoading } = useProfile();
    if (isLoading && profile === null) {
        return <div>Cargando...</div>;
    }

    // console.log(profile);

    return (
        <BrowserRouter>
            {/* Configuración del sistema de notificaciones de Reapop */}
            <NotificationsSystem
                notifications={notifications}
                dismissNotification={(id) => dismissNotification(id)}
                theme={wyboTheme}
            />
            <Routes>
                <Route path="/" element={<StudioLayout />}>
                    <Route index element={<StudioPage />} />
                </Route>

                {!profile && (
                    <Route path="/auth" element={<AuthLayout />}>
                        <Route index element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route
                            path="confirm-account"
                            element={<ConfirmAccountPage />}
                        />
                        <Route
                            path="request-code"
                            element={<RequestCodePage />}
                        />
                        <Route
                            path="forgot-password"
                            element={<ForgotPasswordPage />}
                        />
                        <Route
                            path="new-password"
                            element={<NewPasswordPage />}
                        />
                    </Route>
                )}

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
