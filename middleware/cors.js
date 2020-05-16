module.exports = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //todos pueden acceder
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPSTIONS') {
        req.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, EGT");
        return res.status(200).json({});
    }
    next();
}
