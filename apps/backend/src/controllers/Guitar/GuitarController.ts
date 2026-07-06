import type { Request, Response } from "express";
import Guitar from "models/Guitar/Guitar";

// Los controladores son similares a los servicios pero se encargan de manejar las peticiones y respuestas HTTP
// Se recomienda utilizar una clase de JavaScript y métodos en lugar de funciones por cada una de las acciones
export class GuitarController {
    // Las funciones o métodos son asincronos en cada controlador
    // Normalmente en todo controlador se tiene que enviar 2 parametros: req y res
    // En el caso de que no se vaya a utilizar req, se puede colocar '_req' como reemplazo

    // Obtiene todas las guitarras y excluye el vampo '__v' de las guitarras
    static getAllGuitars = async (_req: Request, res: Response) => {
        try {
            const guitars = await Guitar.find({}).select("-__v");

            // Devuelve un objeto JSON con los datos de las guitarras
            res.status(200).json(guitars);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Hubo un error" });
        }
    };
}
