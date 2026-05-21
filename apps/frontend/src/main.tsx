import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Theme as ThemeRadixUI } from '@radix-ui/themes';
import Router from './routes/router';
import { NotificationsProvider } from 'reapop';
import {
    ChakraProvider,
    createSystem,
    defaultConfig,
    defineConfig,
} from '@chakra-ui/react';

// Configuracion de Chakra UI para desactivar el reset de estilos por defecto
// Es util cuando se quiere usar los estilos de Tailwind CSS junto con Chakra UI
const config = defineConfig({
    preflight: false,
});
const system = createSystem(defaultConfig, config);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/* Chakra UI Provider ha cambiado con respecto a la version 2 de Chakra UI, en su lugar opte por Ark UI, contiene los componentes y sus estilos aplicados de Chakra UI */}
        <ChakraProvider value={system}>
            <NotificationsProvider>
                <ThemeRadixUI>
                    <Router />
                </ThemeRadixUI>
            </NotificationsProvider>
        </ChakraProvider>
    </StrictMode>,
);
