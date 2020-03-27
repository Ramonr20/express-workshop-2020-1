const express = require('express');
const app = express();
const { pokemon } = require('./pokedex.json'); //Destructuring


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

// ('url', (req, res, next) => {})
app.get('/pokemon/', (req, res, next) => {
    return res.status(200).send(pokemon);
});

app.get('/pokemon/:id([0-9]{1,3})/', (req, res, next) => {
    const id = req.params.id - 1;

    if (id >= 0 && id <= 150) {
        return res.status(200).send(pokemon[id]);
    }

    return res.status(200).send("Pokemon no encontrado");
});

app.get('/pokemon/:name([A-Za-z]+)/', (req, res, next) => {
    const name = req.params.name;

    const poke = pokemon.filter((p) => {
        return (p.name.toLowerCase() == name.toLowerCase()) ? p : null;
    });
    
    if (poke.length != null) {
        return res.status(200).send(poke);
    }

    return res.status(404).send("Pokemon no encontrado")

});

// process.env.PORT -> define the 80 port if it's no used and not declared
app.listen(process.env.PORT || 3000, () => {

    console.log("Server is running...")

});
