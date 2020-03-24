const express = require('express');
const app = express();
const { pokemon } = require('./pokedex.json');

app.get("/", (req, res, next) => {
    res.status(200);
    res.send("Bienvenido al Pokedex");
});

// ('url', (req, res, next) => {})
app.get('/pokemon/all/', (req, res, next) => {
    res.send(pokemon);
});

app.get('/pokemon/:id([0-9]{1,3})/', (req, res, next) => {
    const id = req.params.id - 1;
    if (id >= 0 && id <= 150) {
        res.status(200);
        res.send(pokemon[id]);
    } else {
        res.status(404);
        res.send("Pokemon no encontrado");
    }
});

app.get('/pokemon/:name', (req, res, next) => {
    const name = req.params.name;

    pokemon.forEach(pok => {
        if (pok.name == name) {
            res.status(200);
            return res.send(pok);
        }
    });
    res.status(404);
    res.send("Pokemon no encontrado");
});

// process.env.PORT -> define the 80 port if it's no used and not declared
app.listen(process.env.PORT || 3000, () => {

    console.log("Server is running...")

});
