import { SwitchButton } from '@/ui';
import { KeyboardIcon } from '@/icons';
import { usePreferences } from '@/hooks';

export const ShowKeyboardButton = () => {
    const { showKeyboardKeys, toggleShowKeyboardKeys } = usePreferences();

    return (
        <SwitchButton
            text="Ver teclas en pantalla"
            title="Muestra las teclas de cada nota en pantalla"
            value={showKeyboardKeys}
            onClick={toggleShowKeyboardKeys}
            icon={<KeyboardIcon className="size-6" />}
        />
    );
};
