# Guitar-App-Monorepo

Monorepositorio para la aplicación web de simulador de guitarra hecho con MongoDB, Express, Node y React

## Diccionario de efectos de sonido de Tone.JS

### Distortion

| Propiedad    | Tipo                     | Valor por defecto | Rango   | Descripción                                 |
| ------------ | ------------------------ | ----------------- | ------- | ------------------------------------------- |
| `distortion` | `number`                 | `0.4`             | `0 → 1` | Cantidad de distorsión aplicada.            |
| `oversample` | `"none" \| "2x" \| "4x"` | `"none"`          | -       | Reduce aliasing generado por la distorsión. |
| `wet`        | `number`                 | `1`               | `0 → 1` | Mezcla entre señal original y procesada.    |
