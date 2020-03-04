const express = require('express');
const app = express();

app.get("/", (req, res, next) => {
    res.send("Welcome to fsocity");
});

// ('url', (req, res, next) => {})
app.get('/:name', (req, res, next) => {
    res.status(200);
    res.send("Hola, " + req.params.name);
});
// process.env.PORT -> define the 80 port if it's no used and not declared
app.listen(process.env.PORT || 3000, () => {

    console.log("Server is running...")

});
