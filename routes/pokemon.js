const express = require('express');
const pokemon = express.Router();

// const  pk  = require('../pokedex.json').pokemon; //Destructuring
const db = require('../config/database');

pokemon.post("/", (req, res, next) => {
    return res.status(200).send(req.body);
});

// ('url', (req, res, next) => {})
pokemon.get('/', async (req, res, next) => {
    const pokmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json(pokmn);
});

pokemon.get('/:id([0-9]{1,3})', (req, res, next) => {
    const id = req.params.id - 1;

    if (id >= 0 && id <= 150) {
        return res.status(200).send(pk[id]);
    }

    return res.status(200).send("Pokemon no encontrado");
});

pokemon.get('/:name([A-Za-z]+)', (req, res, next) => {
    const name = req.params.name;

    const poke = pk.filter((p) => {
        return (p.name.toLowerCase() == name.toLowerCase()) && p;
    });
    
    if (poke.length != null) {
        return res.status(200).send(poke);
    }

    return res.status(404).send("Pokemon no encontrado")

});

module.exports = pokemon;