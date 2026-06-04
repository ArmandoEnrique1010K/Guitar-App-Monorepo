import type { Effects } from '@/schemas';

export const EFFECTS_NAMES: Record<keyof Effects, string> = {
    distortion: 'Distorsión',
    reverb: 'Reverberación',
    chorus: 'Coro',
    tremolo: 'Tremolo',
    vibrato: 'Vibrato',
};
