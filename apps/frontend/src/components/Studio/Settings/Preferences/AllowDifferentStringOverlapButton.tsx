import { SwitchButton } from '@/ui';
import { ShuffleIcon } from '@/icons';
import { usePreferences } from '@/hooks';

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
