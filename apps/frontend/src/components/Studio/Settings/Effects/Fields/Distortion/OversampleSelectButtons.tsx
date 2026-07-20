import { DISTORTION_SCHEMA } from '@/constants/distortion.constants';
import { useEffects } from '@/hooks';
import { HorizontalButtonGroup } from '@/ui';
import { formatCamelCaseToWords, getPropertyName } from '@/utils';

export const OversampleSelectButtons = () => {
    const { updateEffect, effects } = useEffects();

    return (
        <HorizontalButtonGroup
            label={formatCamelCaseToWords(
                getPropertyName<typeof DISTORTION_SCHEMA>('oversample'),
            )}
            title={DISTORTION_SCHEMA.oversample.label}
            value={effects.distortion.oversample as 'none' | '2x' | '4x'}
            onChange={(value) =>
                updateEffect('distortion', {
                    oversample: value as 'none' | '2x' | '4x',
                })
            }
            options={['none', '2x', '4x']}
        />
    );
};
