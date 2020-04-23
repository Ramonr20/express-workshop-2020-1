const express = require('express');
const pokemon = express.Router();

// const  pk  = require('../pokedex.json').pokemon; //Destructuring
const db = require('../config/database');

pokemon.post("/", async (req, res, next) => {

    try {
        const { pok_name, pok_height, pok_weight, pok_base_experience} = req.body;
        let query = "INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience)";
        query +=  ` VALUES('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).send({code: 201, message: "Pokemon insertado correctamente"});
        }
    } catch {
        return res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
});

// ('url', (req, res, next) => {})
pokemon.get('/', async (req, res, next) => {
    const pk = await db.query("SELECT * FROM pokemon");
    return res.status(200).json({code: 200, message: pk});
});

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;

    let query = "SELECT * FROM pokemon WHERE pok_id = " + id;

    await db.query(query, (err, data) => {
        if (err) {
            console.log(err);
        }
        if (data.length > 0) {
            return res.status(200).json({code: 200, message: data});
        }
        return res.status(404).send({code: 404, message: "Pokemon no encontrado"}); 
    });    

});

pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {
    let name = req.params.name;

    let query = "SELECT * FROM pokemon WHERE pok_name = " + "\'" + name.toLowerCase() + "\'";

    await db.query(query, (err, data) => {
        if (err) {
            console.log(err);
        }
        if (data.length > 0) {
            return res.status(200).json({code: 200, message: data});
        }
        return res.status(404).send({code: 404, message: "Pokemon no encontrado"})
    });

});

module.exports = pokemon;