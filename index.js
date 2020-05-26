//Dependencies
const morgan = require('morgan');
const express = require('express');
const app = express();
//Routers
const pokemon = require('./routes/pokemon');
const user = require('./routes/user');
//own middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors');
//express middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

/* 
GET - obtener recursos
POST - almacenar/crear recursos
PATCH - modificar una parte de un recurso
PUT - modificar un recurso
DELETE - borrar un recurso
*/
app.use(cors);
app.get("/", index);
app.use("/user", user);//cargar las rutas de user
app.use(auth);//Authentication token middleware
app.use("/pokemon", pokemon);// cargar las rutas de pokemon
app.use(notFound); // Ruta no encontrado

// process.env.PORT -> define the 80 port if it's no used and not declared
app.listen(process.env.PORT || 3000, () => {

    console.log("Server is running...")

});
