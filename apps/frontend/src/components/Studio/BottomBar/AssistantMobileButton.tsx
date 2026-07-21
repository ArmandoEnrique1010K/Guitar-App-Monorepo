import { useAssistant, useSettings } from '@/hooks';
import { SparkleFillIcon } from '@/icons';
import { LatchButton } from '@/ui';
import { useEffect, useRef } from 'react';

// Este componente se mostrara en pantalla menores que 1024 px
export const AssistantMobileButton = () => {
    const { openAssistantPanel } = useAssistant();
    const { selectedPanel, setSelectedPanel } = useSettings();

    /**
     * useRef se utiliza para conservar el valor más reciente de selectedPanel
     * incluso durante el desmontaje del componente.
     *
     * ¿Por qué no usar directamente selectedPanel dentro del cleanup?
     *
     * Porque el cleanup de useEffect captura el valor existente en el momento
     * en que el effect fue creado.
     *
     * Si selectedPanel cambia posteriormente, el cleanup podría quedarse con
     * un valor "viejo" (stale closure).
     *
     * Con useRef:
     * - current siempre apunta al valor más reciente
     * - no provoca renders adicionales
     * - permite acceder al último estado durante el unmount
     */
    const selectedPanelRef = useRef(selectedPanel);

    /**
     * Sincroniza el ref con el valor actual del panel seleccionado.
     *
     * Cada vez que selectedPanel cambia:
     * - actualizamos selectedPanelRef.current
     * - el cleanup tendrá acceso al valor más reciente
     */
    useEffect(() => {
        selectedPanelRef.current = selectedPanel;
    }, [selectedPanel]);

    /**
     * Cuando el componente se desmonta:
     * - verificamos si el panel actual es 'assistant'
     * - si lo es, restauramos el panel a 'preferences'
     *
     * Esto ocurre principalmente cuando:
     * - el usuario cambia de mobile a desktop
     * - el botón mobile desaparece del árbol de componentes
     */
    useEffect(() => {
        return () => {
            if (selectedPanelRef.current === 'assistant') {
                setSelectedPanel('preferences');
            }
        };
    }, [setSelectedPanel]);

    return (
        <LatchButton
            title="Hazle una pregunta a la Inteligencia Artificial"
            onClick={() => {
                setSelectedPanel('assistant');

                // Muestra el panel del asistente
                openAssistantPanel();
            }}
            selected={selectedPanel === 'assistant'}
            icon={<SparkleFillIcon className={'size-8'} />}
        />
    );
};
