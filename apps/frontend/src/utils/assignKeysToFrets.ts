import { KEYSBYROW } from '@/constants';
import { keyboardRows } from '@/data/keyboardRows';
import type { Neck } from '@/schemas';

export const assignKeysToFrets = (
    file: Neck,
    firstRowKeys: number,
    secondRowKeys: number,
    thirdRowKeys: number,
    fourthRowKeys: number,
    fifthRowKeys: number,
    sixthRowKeys: number,
    startFromTheChord: number,
    lockTheZeroChord: boolean,
): Neck => {
    let result: Neck = [];

    // Almacena las teclas asignadas por fila
    const arrayRowKeys = [
        firstRowKeys,
        secondRowKeys,
        thirdRowKeys,
        fourthRowKeys,
        fifthRowKeys,
        sixthRowKeys,
    ];

    // Iterar sobre las 6 cuerdas de la guitarra
    for (let i = 0; i < 6; i++) {
        // Buscar la cuerda en los datos proporcionados
        const findRope = file.find((n) => n.rope === 6 - i) || {
            rope: 0,
            frets: [],
        };
        const rowKeys = arrayRowKeys[i];

        // Obtener las teclas asignadas a la fila de trastes

        const assignRowKeys =
            keyboardRows[keyboardRows.length - 1 - rowKeys]?.keys;

        // getAssignedKeys(rowKeys) || [];

        // Iterar sobre los trastes de la cuerda
        for (let index = 0; index < findRope.frets.length; index++) {
            const element = findRope.frets[index];

            // Asignar teclas si no está bloqueado el traste 0
            if (index >= startFromTheChord && !lockTheZeroChord) {
                if (index <= assignRowKeys?.length + 1) {
                    element.key = assignRowKeys[index - startFromTheChord];
                } else {
                    element.key = undefined;
                }
            } else {
                element.key = undefined;
            }

            // Ajuste si `lockTheZeroChord` está activado
            if (lockTheZeroChord && startFromTheChord === 0) {
                startFromTheChord = 1;
            }

            // Asignar la primera tecla si `lockTheZeroChord` está activado
            if (index === 0 && lockTheZeroChord) {
                const elementKey =
                    assignRowKeys?.[0] !== undefined ? assignRowKeys?.[0] : '';
                if (elementKey) {
                    element.key = elementKey;
                }
                continue;
            }

            // Asignación de teclas si `lockTheZeroChord` es verdadero
            if (index !== 0 && lockTheZeroChord) {
                if (index >= startFromTheChord) {
                    if (index < assignRowKeys?.length + KEYSBYROW + 1) {
                        const assignedKey =
                            assignRowKeys[index - startFromTheChord + 1];
                        element.key =
                            assignedKey !== undefined ? assignedKey : undefined;
                    } else {
                        element.key = undefined;
                    }
                } else {
                    element.key = 'OCULTAR'; // Ocultar si está fuera del rango
                }
            }

            // Asignación de teclas normal si `lockTheZeroChord` es falso
            if (!lockTheZeroChord) {
                if (index <= assignRowKeys?.length + KEYSBYROW) {
                    element.key = assignRowKeys[index - startFromTheChord];
                } else {
                    element.key = undefined;
                }
            }

            // Ocultar notas que no deben mostrarse
            if (!lockTheZeroChord && index <= startFromTheChord - 1) {
                element.key = 'OCULTAR';
            }

            if (
                lockTheZeroChord &&
                index === KEYSBYROW + startFromTheChord - 1
            ) {
                element.key = 'OCULTAR';
            }

            if (index > KEYSBYROW - 1 + startFromTheChord) {
                element.key = 'OCULTAR';
            }
        }

        // Agregar la cuerda al resultado final
        result = [...result, { rope: findRope.rope, frets: findRope.frets }];
    }

    return filterFrets(result); // Filtrar las notas finales antes de retornar
};
const filterFrets = (neck: Neck): Neck => {
    return neck.map((note) => ({
        ...note,
        frets: note.frets.filter((f) => f.key !== 'OCULTAR'),
    }));
};
