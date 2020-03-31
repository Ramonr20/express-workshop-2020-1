const bodyParser = require('body-parser');
const morgan = require('morgan');

const express = require('express');
const app = express();

const pokemon = require('./routes/pokemon');

app.use(morgan('dev'));
// a todas las peticiones se les aplique una función
//añadir middleweres
app.use(bodyParser.json()); //procesa la petición a json
app.use(bodyParser.urlencoded({ extended: true}));

/* 
GET - obtener recursos
POST - almacenar/crear recursos
PATCH - modificar una parte de un recurso
PUT - modificar un recurso
DELETE - borrar un recurso
*/

app.get("/", (req, res, next) => {
    return res.status(200).send("Bienvenido al Pokedex");
});

// cargar las rutas de pokemon
app.use("/pokemon", pokemon);

// process.env.PORT -> define the 80 port if it's no used and not declared
app.listen(process.env.PORT || 3000, () => {

    console.log("Server is running...")

});
