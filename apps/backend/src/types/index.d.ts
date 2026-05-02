import { INotebook } from "models/Notebook/Notebook";
import { IUser } from "models/User/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      notebook?: INotebook;
    }
  }
}

export {};
