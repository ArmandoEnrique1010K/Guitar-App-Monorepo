// cleanSolo -> Clean Solo
// distortionSolo -> Distortion Solo
// autoFilterBaseFrequency -> Auto Filter Base Frequency
export const formatCamelCaseToWords = (text: string): string => {
    return (
        text
            // Inserta un espacio antes de cada mayúscula
            .replace(/([A-Z])/g, ' $1')
            // Elimina espacios al inicio si los hubiera
            .trim()
            // Convierte la primera letra a mayúscula
            .replace(/^./, (char) => char.toUpperCase())
    );
};
