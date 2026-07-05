import colors from "colors";
import server from "./server";

// Habilita el puerto que viene de las variables de entorno o por defecto 4000
const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(colors.cyan(`REST API funcionando en el puerto ${port}`));
});
