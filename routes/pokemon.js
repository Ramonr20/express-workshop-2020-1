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

pokemon.delete("/:id([0-9]{1,3})", async(req, res, next) => {
    const query = `DELETE FROM pokemon WHERE pok_id = ${req.params.id}`;
    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
        return res.status(200).json({code: 200, message: "Pokmon borrado correctamente"});
    }
    return res.status(404).json({code: 404, message: "Pokemon no encontrado"});
});

pokemon.put("/:id([0-9]{1,3})", async (req, res, next) => {
    try {
        const { pok_name, pok_height, pok_weight, pok_base_experience} = req.body;
        let query = `UPDATE pokemon SET pok_name = '${pok_name}', pok_height = ${pok_height} ,`;
        query += `pok_weight = ${pok_weight}, pok_base_experience = ${pok_base_experience} WHERE pok_id = ${req.params.id}`;
    
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).send({code: 202, message: "Pokemon actualizado correctamente"});
        }
    } catch {
        return res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
});

pokemon.patch("/:id([0-9]{1,3})", async (req, res, next) => {
    if (req.body.pok_name) {
        let query = `UPDATE pokemon SET pok_name = '${req.body.pok_name}' WHERE pok_id = ${req.params.id}`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).send({code: 200, message: "Pokemon actualizado correctamente"});
        }
    }
    return  res.status(500).json({code: 500, message: "Ocurrió un error"});
});

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