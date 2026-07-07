import type { Effects } from '@/types';

export const EFFECTS_NAMES: Record<keyof Effects, string> = {
    distortion: 'Distorsión',
    reverb: 'Reverberación',
    chorus: 'Coro',
    tremolo: 'Tremolo',
    vibrato: 'Vibrato',
    freeverb: 'Libre Reverb.',
    // gain:        'Ganancia',
    // eq3:         'Ecualizador',
    // bitcrusher:  'Bitcrusher',
    // phaser:      'Desfasador',
    // compressor:  'Compresor',
    // autowah:     'Auto Wah'
};
