import { useFretboard } from '@/hooks';
import { Dialog } from '@radix-ui/themes';
import { useEffect, type ReactNode } from 'react';

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
    title: string;
};

export const Modal = ({ open, onOpenChange, children, title }: Props) => {
    const { lockKeyboard, unlockKeyboard } = useFretboard();
    useEffect(() => {
        if (open) {
            lockKeyboard();
        } else {
            unlockKeyboard();
        }

        return () => {
            unlockKeyboard();
        };
    }, [open]);
    return (
        <Dialog.Root
            open={open}
            // onOpenChange={onOpenChange}
            onOpenChange={(newOpen) => {
                // Solo permitir cerrar si no estamos haciendo clic en una notificación
                if (newOpen === false) {
                    // Verificar si el clic fue en una notificación
                    const target = document.activeElement;
                    const isNotification = target?.closest?.(
                        '.reapop__notification',
                    );

                    if (!isNotification) {
                        onOpenChange(newOpen);
                    }
                } else {
                    onOpenChange(newOpen);
                }
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
                transition-none
"
                style={{
                    // Algunas propiedades CSS se definen dentro de style
                    borderRadius: 0,
                    backgroundColor: '#0f1117',
                    transition: 'none',
                    padding: '16px',
                }}
                // Evitar que el overlay cierre el modal al hacer clic
                onPointerDownOutside={(e) => {
                    // Prevenir cierre si el clic fue en una notificación
                    const target = e.target as HTMLElement;
                    if (target.closest?.('.reapop__notification')) {
                        e.preventDefault();
                    }
                }}
            >
                <Dialog.Title>
                    <div className="text-2xl font-bold mb-4">{title}</div>
                </Dialog.Title>

                {/* Este campo se ignora porque segun la consola del navegador dice que es necesario */}
                <Dialog.Description></Dialog.Description>
                <div className="flex flex-col gap-6 text-sm">{children}</div>
            </Dialog.Content>
        </Dialog.Root>
    );
};
