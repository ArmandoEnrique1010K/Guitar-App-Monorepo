// Función para simular una demora en milisegundos
export const sleep = async (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time));
};
