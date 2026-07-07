import { createRoot } from 'react-dom/client';
import './index.css';
import { Theme as ThemeRadixUI } from '@radix-ui/themes';
import { NotificationsProvider } from 'reapop';
import {
    ChakraProvider,
    createSystem,
    defaultConfig,
    defineConfig,
} from '@chakra-ui/react';
import App from './App';

// Configuración de Chakra UI para desactivar el reset global de estilos.
// Esto permite utilizar Tailwind CSS sin que Chakra sobrescriba sus estilos.
const config = defineConfig({
    preflight: false,
});

// Crea el sistema de diseño de Chakra UI utilizando la configuración por defecto
// junto con la configuración personalizada.
const system = createSystem(defaultConfig, config);

// Punto de entrada de la aplicación.
// Se registran los proveedores globales:
// - ChakraProvider: sistema de diseño y componentes de Chakra UI.
// - NotificationsProvider: contexto para el sistema de notificaciones Reapop.
// - ThemeRadixUI: tema global utilizado por los componentes de Radix UI.
createRoot(document.getElementById('root')!).render(
    <ChakraProvider value={system}>
        <NotificationsProvider>
            <ThemeRadixUI>
                <App />
            </ThemeRadixUI>
        </NotificationsProvider>
    </ChakraProvider>,
);
