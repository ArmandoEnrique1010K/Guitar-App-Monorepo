import { SwitchButton } from '@/ui/Studio/SwitchButton';
import { ShuffleIcon } from '@/icons/ShuffleIcon';
import { usePreferences } from '@/hooks/usePreferences';

export const AllowDifferentStringOverlapButton = () => {
    const { allowDifferentStringOverlap, toggleAllowDifferentStringOverlap } =
        usePreferences();

    return (
        <SwitchButton
            text="Mantener entre cuerdas"
            title="Mantener reproduciendo notas en diferentes cuerdas"
            value={allowDifferentStringOverlap}
            onClick={toggleAllowDifferentStringOverlap}
            icon={<ShuffleIcon className="w-6 h-6" />}
        />
    );
};
