import { IUser } from "models/User/User";
import { IPreset } from "models/Workspace/Preset";
import { IWorkspace } from "models/Workspace/Workspace";

// En este archivo se define la forma en que typescript entiende
// las propiedades que se le agregan a Request, se utilizan en los
// middlewares

// Por ejemplo, en el middleware auth.ts se agrega la propiedad "user"
// que es del tipo IUser. Esto se hace para que typescript sepa que
// la propiedad "user" existe en Request y que tiene un tipo especifico.

// req.user -> Guarda al usuario autenticado

// Al hacer esto, se puede acceder a la propiedad "user" en cualquier
// controlador que reciba un objeto Request sin tener que hacer un
// casting.
declare global {
    namespace Express {
        interface Request {
            user?: IUser;
            workspace?: IWorkspace;
            preset?: IPreset;

            // Campo para el nombre del espacio de trabajo
            presetName?: string;
        }
    }
}

// Convierte el archivo en un modulo de TypeScript
export {};
