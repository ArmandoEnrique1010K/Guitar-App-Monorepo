import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout, StudioLayout } from '@/layouts';
import {
    ConfirmAccountPage,
    RequestPasswordResetPage,
    LoginPage,
    NewPasswordPage,
    CreateAccountPage,
    RequestConfirmationCodePage,
    StudioPage,
} from '@/pages';
import { useProfile } from '@/hooks';

export default function Router() {
    // Obtiene el perfil del usuario autenticado.
    // Si es null significa que no existe una sesión iniciada.
    const { profile } = useProfile();

    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas principales de la aplicación */}
                <Route path="/" element={<StudioLayout />}>
                    <Route
                        // index significa que es la página principal del conjunto de rutas
                        index
                        element={<StudioPage />}
                    />
                </Route>

                {/* Las rutas que dependen del perfil del usuario se pueden definir de 2 formas: */}
                {/* 1. Mediante un operador ternario simplificado que agrupe todas las rutas */}
                {/*{ !profile && ( <Route> ... </Route> ) } */}

                {/* 2. Usando un operador ternario para evaluar que contenido se renderizara cuando
                se acceda a esa ruta */}

                {/* Rutas de autenticación.*/}
                {/* Si el usuario ya inició sesión se redirige automáticamente al inicio para 
                impedir que vuelva a acceder a las pantallas de autenticación. */}

                <Route
                    path="/auth"
                    // <Navigate> sirve para navegar hacia esa ruta y replace
                    // sirve para reemplazar el contenido actual
                    element={
                        profile ? <Navigate to="/" replace /> : <AuthLayout />
                    }
                >
                    <Route index element={<LoginPage />} />
                    <Route path="register" element={<CreateAccountPage />} />
                    <Route
                        path="confirm-account"
                        element={<ConfirmAccountPage />}
                    />
                    <Route
                        path="request-code"
                        element={<RequestConfirmationCodePage />}
                    />
                    <Route
                        path="forgot-password"
                        element={<RequestPasswordResetPage />}
                    />
                    <Route path="new-password" element={<NewPasswordPage />} />
                </Route>

                {/* Cualquier ruta no registrada redirige a la página principal. */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
