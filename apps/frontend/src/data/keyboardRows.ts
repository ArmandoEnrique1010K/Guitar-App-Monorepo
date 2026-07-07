import type { KeyboardsRows } from '@/types';

// Filas de teclas del teclado
export const keyboardRows: KeyboardsRows = [
    {
        // Fila
        row: 1,
        // Arreglo de teclas (código y palabra)
        keys: [
            { code: 'Digit1', label: '1' },
            { code: 'Digit2', label: '2' },
            { code: 'Digit3', label: '3' },
            { code: 'Digit4', label: '4' },
            { code: 'Digit5', label: '5' },
            { code: 'Digit6', label: '6' },
            { code: 'Digit7', label: '7' },
            { code: 'Digit8', label: '8' },
            { code: 'Digit9', label: '9' },
            { code: 'Digit0', label: '0' },
            { code: 'Minus', label: "'" },
        ],
    },
    {
        row: 2,
        keys: [
            { code: 'KeyQ', label: 'q' },
            { code: 'KeyW', label: 'w' },
            { code: 'KeyE', label: 'e' },
            { code: 'KeyR', label: 'r' },
            { code: 'KeyT', label: 't' },
            { code: 'KeyY', label: 'y' },
            { code: 'KeyU', label: 'u' },
            { code: 'KeyI', label: 'i' },
            { code: 'KeyO', label: 'o' },
            { code: 'KeyP', label: 'p' },
            // El caracter (`), se reemplaza por (Dead)
            { code: 'BracketLeft', label: 'Dead' },
        ],
    },
    {
        row: 3,
        keys: [
            { code: 'KeyA', label: 'a' },
            { code: 'KeyS', label: 's' },
            { code: 'KeyD', label: 'd' },
            { code: 'KeyF', label: 'f' },
            { code: 'KeyG', label: 'g' },
            { code: 'KeyH', label: 'h' },
            { code: 'KeyJ', label: 'j' },
            { code: 'KeyK', label: 'k' },
            { code: 'KeyL', label: 'l' },
            { code: 'Semicolon', label: 'ñ' },
            { code: 'Quote', label: '{' },
        ],
    },
    {
        row: 4,
        keys: [
            {
                code: 'KeyZ',
                label: 'z',
            },
            {
                code: 'KeyX',
                label: 'x',
            },
            {
                code: 'KeyC',
                label: 'c',
            },
            {
                code: 'KeyV',
                label: 'v',
            },
            {
                code: 'KeyB',
                label: 'b',
            },
            {
                code: 'KeyN',
                label: 'n',
            },
            {
                code: 'KeyM',
                label: 'm',
            },
            {
                code: 'Comma',
                label: ',',
            },
            {
                code: 'Period',
                label: '.',
            },
            {
                code: 'Slash',
                label: '-',
            },
            {
                code: 'ShiftRight',
                label: 'Shift',
            },
        ],
    },
    {
        row: 5,
        keys: [],
    },
    {
        row: 6,
        keys: [],
    },
];
