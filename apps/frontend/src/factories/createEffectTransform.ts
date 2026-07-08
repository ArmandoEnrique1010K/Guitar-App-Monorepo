// Crea un objeto encargado de transformar un valor interno al valor que se
// mostrará al usuario y viceversa.

// Esto resulta útil cuando el valor almacenado en el estado no coincide con el
// valor mostrado en la interfaz.

//  Ejemplo:
//  Valor interno:   0.6
//  Factor:          100
//  Decimales:       0

//  format(0.6)  -> 60    (valor mostrado al usuario)
//  parse(60)    -> 0.6   (valor almacenado en el estado)
export const createEffectTransform = (factor: number, decimals: number) => ({
    // Convierte el valor interno al valor mostrado al usuario.

    // Ejemplo:
    // factor = 100
    // 0.6 -> 60
    format: (value: number) => Number((value * factor).toFixed(decimals)),

    // Realiza la transformación inversa de format().

    // Convierte el valor introducido por el usuario al valor interno que será
    // almacenado en el estado de la aplicación.

    // Ejemplo:
    // factor = 100
    // 60 -> 0.6

    // Se utilizan cuatro decimales adicionales para reducir los errores de
    // precisión producidos por los números de coma flotante en JavaScript.
    // De este modo se evita perder precisión durante la conversión.
    parse: (displayValue: number) =>
        Number((displayValue / factor).toFixed(decimals + 4)),
});
