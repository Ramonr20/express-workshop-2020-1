const express = require('express');
const pokemon = express.Router();

// const  pk  = require('../pokedex.json').pokemon; //Destructuring
const db = require('../config/database');

pokemon.post("/", (req, res, next) => {
    return res.status(200).send(req.body);
});

// ('url', (req, res, next) => {})
pokemon.get('/', async (req, res, next) => {
    const pk = await db.query("SELECT * FROM pokemon");
    return res.status(200).json(pk);
});

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;

    let query = "SELECT * FROM pokemon WHERE pok_id = " + id;

    await db.query(query, (err, data) => {
        if (data.length > 0) {
            return res.status(200).json(data);
        }
        return res.status(404).send("Pokemon no encontrado"); 
    });    

});

pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {
    let name = req.params.name;

    let query = "SELECT * FROM pokemon WHERE pok_name = " + "\'" + name.toLowerCase() + "\'";

    await db.query(query, (err, data) => {
        if (data.length > 0) {
            return res.status(200).json(data);
        }
        return res.status(404).send("Pokemon no encontrado")
    });

});

module.exports = pokemon;