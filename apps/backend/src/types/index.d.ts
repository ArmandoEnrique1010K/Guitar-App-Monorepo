import { IConfiguration } from "models/Notebook/Configuration";
import { INotebook } from "models/Notebook/Notebook";
import { IUser } from "models/User/User";

// En este archivo se define la forma en que typescript entiende
// las propiedades que se le agregan a Request en el archivo
// middlewares/auth.ts.

// Por ejemplo, en el middleware auth.ts se agrega la propiedad "user"
// que es del tipo IUser. Esto se hace para que typescript sepa que
// la propiedad "user" existe en Request y que tiene un tipo especifico.

// Al hacer esto, se puede acceder a la propiedad "user" en cualquier
// controlador que reciba un objeto Request sin tener que hacer un
// casting.
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      notebook: INotebook;
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      configuration: IConfiguration;
    }
  }
}
export {};
