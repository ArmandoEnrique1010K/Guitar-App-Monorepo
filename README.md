# Guitar-App-Monorepo

Monorepositorio para la aplicación web de simulador de guitarra hecho con MongoDB, Express, Node y React

## Diccionario de datos de las propiedades de cada efecto de sonido

### AutoFilter

|  | Nombre | Tipo | Valor minimo | Valor maximo | Salto entre valores | Valor por defecto | Factor (Valor * factor) | Unidad | Cifras decimales |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| baseFrequency | **Frecuencia base** | number | 20 | 2000 | 10 | 300 | 1 | Hz | 0 |
| depth | **Profundidad** | number | 0 | 1 | 0.01 | 0.8 | 100 | % | 0 |
| frequency | **Frecuencia** | number | 0.1 | 20 | 0.1 | 2 | 1 | Hz | 1 |
| octaves | **Octavas** | number | 0 | 10 | 0.1 | 3 | 1 | oct | 1 |
| type | **Tipo de onda** | sine | square | triangle | sawtooth |  |  |  | sine |  |  |  |
| wet | **Mezcla (Wet)** | number | 0 | 1 | 0.01 | 1 | 100 | % | 0 |

### Chorus

|  | Nombre | Tipo | Valor minimo | Valor maximo | Salto entre valores | Valor por defecto | Factor (Valor * factor) | Unidad | Cifras decimales |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| delayTime | **Tiempo de retardo** | number | 1 | 20 | 0.1 | 3.5 | 1 | ms | 1 |
| depth | **Profundidad** | number | 0 | 1 | 0.01 | 0.7 | 100 | % | 0 |
| frequency | **Frecuencia** | number | 0.1 | 20 | 0.1 | 1.5 | 1 | Hz | 1 |
| feedback | **Realimentación** | number | 0 | 1 | 0.01 | 0.4 | 100 | % | 0 |
| spread | **Separación estéreo** | number | 0 | 360 | 1 | 180 | 1 | ° | 0 |
| type | **Tipo de onda** | sine | square | triangle | sawtooth |  |  |  | sine |  |  |  |
| wet | **Mezcla (Wet)** | number | 0 | 1 | 0.01 | 1 | 100 | % | 0 |

### Compressor

|  | Nombre | Tipo | Valor minimo | Valor maximo | Salto entre valores | Valor por defecto | Factor (Valor * factor) | Unidad | Cifras decimales |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| attack | Ataque | number | 0.001 | 1 | 0.001 | 0.003 | 1000 | ms | 0 |
| knee | Rodilla | number | 0 | 40 | 1 | 30 | 1 | dB | 0 |
| ratio | Relación | number | 1 | 20 | 0.5 | 12 | 1 | :1 | 1 |
| release | Liberación | number | 0.01 | 1 | 0.01 | 0.25 | 1000 | ms | 0 |
| threshold | Umbral | number | -100 | 0 | 1 | -24 | 1 | dB | 0 |

### Distortion

|  | Nombre | Tipo | Valor minimo | Valor maximo | Salto entre valores | Valor por defecto | Factor (Valor * factor) | Unidad | Cifras decimales |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| distortion | Cantidad de distorsión | number | 0 | 1 | 0.01 | 0.4 | 100 | % | 0 |
| oversample | Sobremuestreo | none | 2x | 4x |  |  |  | none |  |  |  |
| wet | **Mezcla (Wet)** | number | 0 | 1 | 0.01 | 1 | 100 | % | 0 |

### EQ3

|  | Nombre | Tipo | Valor minimo | Valor maximo | Salto entre valores | Valor por defecto | Factor (Valor * factor) | Unidad | Cifras decimales |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| low | Graves | number | -30 | 30 | 1 | 0 | 1 | dB | 0 |
| mid | Medios | number | -30 | 30 | 1 | 0 | 1 | dB | 0 |
| high | Agudos | number | -30 | 30 | 1 | 0 | 1 | dB | 0 |
| lowFrequency | Frecuencia de graves | number | 20 | 1000 | 10 | 400 | 1 | Hz | 0 |
| highFrequency | Frecuencia de agudos | number | 1000 | 20000 | 100 | 2500 | 1 | Hz | 0 |

### FeedbackDelay

|  | Nombre | Tipo | Valor minimo | Valor maximo | Salto entre valores | Valor por defecto | Factor (Valor * factor) | Unidad | Cifras decimales |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| delayTime | Tiempo de retardo | number | 0 | 1 | 0.01 | 0.25 | 1000 | ms | 0 |
| Feedback | Realimentación | number | 0 | 0.95 | 0.01 | 0.3 | 100 | % | 0 |
| wet | Mezcla (Wet) | number | 0 | 1 | 0.01 | 0.5 | 100 | % | 0 |

### Freeverb

|  | Nombre | Tipo | Valor minimo | Valor maximo | Salto entre valores | Valor por defecto | Factor (Valor * factor) | Unidad | Cifras decimales |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| roomSize | Tamaño de la sala | number | 0 | 0.99 | 0.01 | 0.7 | 100 | % | 0 |
| dampening | Amortiguación | number | 20 | 15020 | 200 | 3020 | 1 | Hz | 0 |
| wet | Mezcla (Wet) | number | 0 | 1 | 0.01 | 1 | 100 | % | 0 |

### Gate

|  | Nombre | Tipo | Valor minimo | Valor maximo | Salto entre valores | Valor por defecto | Factor (Valor * factor) | Unidad | Cifras decimales |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| threshold | Umbral | number | -100 | 0 | 1 | -40 | 1 | dB | 0 |
| smoothing | Suavizado | number | 0 | 1 | 0.01 | 0.1 | 100 | % | 0 |

### Phaser

|  | Nombre | Tipo | Valor minimo | Valor maximo | Salto entre valores | Valor por defecto | Factor (Valor * factor) | Unidad | Cifras decimales |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| frequency | Frecuencia | number | 0.1 | 20 | 0.1 | 0.5 | 1 | Hz | 1 |
| octaves | Octavas | number | 0 | 8 | 0.1 | 3 | 1 | oct | 1 |
| baseFrequency | Frecuencia base | number | 20 | 2000 | 10 | 350 | 1 | Hz | 0 |
| Q | Resonancia (Q) | number | 0 | 20 | 0.1 | 10 | 1 |  | 1 |
| stages | Etapas | number | 2 | 20 | 1 | 10 | 1 |  | 0 |
| wet | Mezcla (Wet) | number | 0 | 1 | 0.01 | 1 | 100 | % | 0 |

### PingPongDelay

|  | Nombre | Tipo | Valor minimo | Valor maximo | Salto entre valores | Valor por defecto | Factor (Valor * factor) | Unidad | Cifras decimales |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| delayTime | Tiempo de retardo | number | 0 | 2 | 0.01 | 0.25 | 1000 | ms | 0 |
| feedback | Realimentación | number | 0 | 0.95 | 0.01 | 0.3 | 100 | % | 0 |
| wet | Mezcla (Wet) | number | 0 | 1 | 0.01 | 0.5 | 100 | % | 0 |

### PitchShift

|  | Nombre | Tipo | Valor minimo | Valor maximo | Salto entre valores | Valor por defecto | Factor (Valor * factor) | Unidad | Cifras decimales |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| delayTime | Tiempo de retardo | number | 0 | 1 | 0.01 | 0 | 1000 | ms | 0 |
| feedback | Realimentación | number | 0 | 0.95 | 0.01 | 0 | 100 | % | 0 |
| pitch | Cambio de tono | number | -24 | 24 | 1 | 0 | 1 | st | 0 |
| windowSize | Tamaño de ventana | number | 0.01 | 0.5 | 0.01 | 0.1 | 1000 | ms | 0 |
| wet | Mezcla (Wet) | number | 0 | 1 | 0.01 | 1 | 100 | % | 0 |

### Reverb

|  | Nombre | Tipo | Valor minimo | Valor maximo | Salto entre valores | Valor por defecto | Factor (Valor * factor) | Unidad | Cifras decimales |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| delay | Duración de la reverberación | number | 0.1 | 10 | 0.1 | 1.5 | 1 | s | 1 |
| preDelay | Pre-retardo | number | 0 | 1 | 0.01 | 0.01 | 1 | s | 2 |
| wet | Mezcla (Wet) | number | 0 | 1 | 0.01 | 1 | 100 | % | 0 |

### Tremolo

|  | Nombre | Tipo | Valor minimo | Valor maximo | Salto entre valores | Valor por defecto | Factor (Valor * factor) | Unidad | Cifras decimales |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| frequency | Frecuencia | number | 0.1 | 20 | 0.1 | 10 | 1 | Hz | 1 |
| depth | Profundidad | number | 0 | 1 | 0.01 | 0.5 | 100 | % | 0 |
| spread | Separación estéreo | number | 0 | 360 | 1 | 180 | 1 | ° | 0 |
| type | Tipo de onda | sine | square | triangle | sawtooth |  |  |  | sine |  |  |  |
| wet | Mezcla (Wet) | number | 0 | 1 | 0.01 | 1 | 100 | % | 0 |

### Vibrato

|  | Nombre | Tipo | Valor minimo | Valor maximo | Salto entre valores | Valor por defecto | Factor (Valor * factor) | Unidad | Cifras decimales |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| frequency | Frecuencia | number | 0.1 | 20 | 0.01 | 5 | 1 | Hz | 1 |
| depth | Profundidad | number | 0 | 1 | 0.01 | 0.1 | 100 | % | 0 |
| type | Tipo de onda | sine | square | triangle | sawtooth |  |  |  | sine |  |  |  |
| wet | Mezcla (Wet) | number | 0 | 1 | 0.01 | 1 | 100 | % | 0 |

### Parámetros cuyo valor se multiplica por 100 para la vista del usuario

- depth
- feedback
- wet
- distortion
- roomSize
- smoothing

### Parámetros cuyo valor se multiplica por 1000 para la vista del usuario

- attack
- release
- delayTime
- windowSize