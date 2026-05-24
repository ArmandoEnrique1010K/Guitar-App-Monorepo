import { SwitchButton } from '@/ui/Studio/SwitchButton';
import { KeyboardIcon } from '@/icons/KeyboardIcon';
import { usePreferences } from '@/hooks/usePreferences';

export const ShowKeyboardButton = () => {
    const { showKeyboardKeys, toogleShowKeyboardKeys } = usePreferences();

    return (
        <SwitchButton
            text="Ver teclas en pantalla"
            title="Muestra las teclas de cada nota en pantalla"
            value={showKeyboardKeys}
            onClick={toogleShowKeyboardKeys}
            icon={<KeyboardIcon className="size-6" />}
        />
    );
};
