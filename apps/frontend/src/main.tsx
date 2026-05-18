import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Theme as ThemeRadixUI } from '@radix-ui/themes';
import Router from './routes/router';
import { NotificationsProvider } from 'reapop';
// import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/* Chakra UI Provider ha cambiado con respecto a la version 2 de Chakra UI */}
        {/* <ChakraProvider value={defaultSystem}> */}
        <NotificationsProvider>
            <ThemeRadixUI>
                <Router />
            </ThemeRadixUI>
        </NotificationsProvider>
        {/* </ChakraProvider> */}
    </StrictMode>,
);
