import * as Tone from 'tone';

// Función auxiliar para conectar el player a los efectos
export const connectPlayerToEffects = (
    player: Tone.Player,
    effects: Tone.ToneAudioNode[],
) => {
    player.disconnect();

    if (effects.length === 0) {
        player.toDestination();
        return;
    }

    player.connect(effects[0]);

    for (let i = 0; i < effects.length - 1; i++) {
        effects[i].disconnect();
        effects[i].connect(effects[i + 1]);
    }

    effects[effects.length - 1].disconnect();
    effects[effects.length - 1].toDestination();
};
