// El archivo index.ts, si se encuentra dentro de una carpeta, es un archivo de barril
// (barrel file) que centraliza las exportaciones de un módulo y permite simplificar
// las importaciones desde otros archivos.
export * from './AssistantAPI';
export * from './AuthAPI';
export * from './GuitarAPI';
export * from './NoteSamplesAPI';
export * from './ProfileAPI';

// Sin archivo de barril:
// import { login } from '@/api/AuthAPI';
// import { getUser } from '@/api/ProfileAPI';
// import { getAllGuitars } from '@/api/GuitarAPI';

// Con archivo de barril:
// import { login, getUser, getAllGuitars } from '@/api';
