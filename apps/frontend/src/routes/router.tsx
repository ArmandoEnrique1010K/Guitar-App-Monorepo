import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotificationsSystem, {
    useNotifications,
    setUpNotifications,
    wyboTheme,
} from 'reapop';
import AuthLayout from '../layouts/AuthLayout';
import { LoginPage } from '../pages/Auth/LoginPage';
import { GuitarLayout } from '../layouts/GuitarLayout';
import { RegisterPage } from '../pages/Auth/RegisterPage';

export default function Router() {
    const { notifications, dismissNotification } = useNotifications();
    setUpNotifications({
        defaultProps: {
            position: 'top-right',
            dismissAfter: 5000,
            dismissible: true,
            showDismissButton: true,
        },
    });

    return (
        <BrowserRouter>
            {/* Configuración del sistema de notificaciones de Reapop */}
            <NotificationsSystem
                notifications={notifications}
                dismissNotification={(id) => dismissNotification(id)}
                theme={wyboTheme}
            />
            <Routes>
                <Route path="/" element={<GuitarLayout />}></Route>

                <Route path="/login" element={<AuthLayout />}>
                    <Route index element={<LoginPage />} />
                </Route>

                <Route path="/register" element={<AuthLayout />}>
                    <Route index element={<RegisterPage />} />
                </Route>

                {/* <Route element={<InstrumentLayout />}>
                    <Route path="/" index element={<InstrumentPage />} />
                </Route> */}
            </Routes>
        </BrowserRouter>
    );
}

// https://github.com/ArmandoEnrique1010K/Guitar-App-3/blob/v1.2/guitar-app-client-react/src/routes/router.tsx
