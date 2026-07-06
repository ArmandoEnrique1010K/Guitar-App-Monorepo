// Funciones auxiliares para formatear nombres

// Formatear una palabra para que quede de la siguiente forma:
// Clean Solo -> cleanSolo
// Distortion Solo -> distortionSolo
export const formatLowerCamelCase = (word: string): string => {
    const words = word.split(" ");
    return words
        .map((word, index) => {
            if (index === 0) {
                return word.toLowerCase();
            } else {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
        })
        .join("");
};

// Formatear un número para que quede de la siguiente forma:
// 0 -> 00
// 9 -> 09
// 10 -> 10
// 46 -> 46
export const formatTwoDigits = (number: string): string => {
    return number.padStart(2, "0");
};

// Separa el nombre base del posible sufijo numérico.
// Ejemplos:
// "prueba"   -> { baseName: "prueba", number: 0 }
// "prueba 3" -> { baseName: "prueba", number: 3 }
export const splitNameAndNumber = (name: string) => {
    const match = name.trim().match(/^(.*?)(?: (\d+))?$/);

    if (!match) {
        return null;
    }

    return {
        baseName: match[1].trim(),
        number: match[2] ? Number(match[2]) : 0,
    };
};
