import { useFretboard } from '@/hooks';
import { Dialog } from '@radix-ui/themes';
import { useEffect, type ReactNode } from 'react';

type Props = {
    open: boolean;
    // Función opcional que se ejecuta cuando el estado del modal cambia.
    // Si no se proporciona, el modal no podrá cerrarse haciendo clic fuera
    // ni presionando la tecla Escape.
    onOpenChange?: (open: boolean) => void;

    children: ReactNode;
    title: string;
};

export const Modal = ({ open, onOpenChange, children, title }: Props) => {
    const { lockKeyboard, unlockKeyboard } = useFretboard();

    // Bloquea el teclado del simulador mientras el modal está abierto
    // para evitar que se reproduzcan notas accidentalmente.
    useEffect(() => {
        if (open) {
            lockKeyboard();
        } else {
            unlockKeyboard();
        }

        // Asegura que el teclado vuelva a habilitarse si el componente se desmonta.
        return () => {
            unlockKeyboard();
        };
    }, [open]);
    return (
        <Dialog.Root
            open={open}
            onOpenChange={(newOpen) => {
                // Si no existe callback, el modal se vuelve bloqueante:
                // no se permite cerrarlo desde el overlay ni con Escape.
                if (!onOpenChange) return;

                // Cuando Radix intenta cerrar el modal (newOpen === false),
                // verificamos si el foco actual pertenece a una notificación de Reapop.
                // Esto evita que un clic sobre una notificación cierre el modal.
                if (newOpen === false) {
                    const activeElement =
                        document.activeElement as HTMLElement | null;
                    const isNotification = activeElement?.closest?.(
                        '.reapop__notification',
                    );

                    // Solo cerramos el modal si el clic NO ocurrió sobre una notificación.
                    if (!isNotification) {
                        onOpenChange(newOpen);
                    }
                    return;
                }

                // Permitir apertura normalmente.
                onOpenChange(newOpen);
            }}
        >
            <Dialog.Content
                maxWidth="600px"
                minWidth="250px"
                maxHeight="400px"
                className="
                scrollbar
                scrollbar-track-black
                scrollbar-thumb-green-600
                text-green-500
                border-2
                border-[#4f5d75]
                transition-none"
                style={{
                    // Algunas propiedades CSS se definen dentro de style
                    borderRadius: 0,
                    backgroundColor: '#0f1117',
                    transition: 'none',
                    padding: '16px',
                }}
                onPointerDownOutside={(e) => {
                    // Este evento se dispara cuando el usuario hace clic fuera
                    // del contenido del modal (sobre el overlay).

                    // Si el modal es bloqueante (sin onOpenChange),
                    // se cancela siempre el cierre.
                    if (!onOpenChange) {
                        e.preventDefault();
                        return;
                    }

                    // También evitamos el cierre si el clic ocurrió sobre
                    // una notificación de Reapop que está renderizada por encima
                    // del overlay mediante un Portal.
                    const target = e.target as HTMLElement;

                    if (target.closest?.('.reapop__notification')) {
                        e.preventDefault();
                    }
                }}
                onEscapeKeyDown={(e) => {
                    // Si el modal es bloqueante, impedir cierre con Escape.
                    if (!onOpenChange) {
                        e.preventDefault();
                    }
                }}
            >
                <Dialog.Title>
                    <div className="text-2xl font-bold mb-4">{title}</div>
                </Dialog.Title>

                {/* Radix requiere una descripción para accesibilidad */}
                {/* Este campo se ignora porque segun la consola del navegador dice que es necesario */}
                <Dialog.Description></Dialog.Description>
                <div className="flex flex-col gap-6 text-sm">{children}</div>
            </Dialog.Content>
        </Dialog.Root>
    );
};
