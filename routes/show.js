var express = require('express');
var router = express.Router();

// Listar espetaculos
router.get('/', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM espetaculo", function (err, rows) {
            if (!err && rows.length > 0) {
                res.json(rows);
            } else {
                res.json([]);
            }
        });
    });
});

// Buscar espetaculo pelo id
router.get('/:id', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var id = req.params.id;
        connection.query("SELECT * FROM espetaculo WHERE id='"
            + id + "' LIMIT 1", function (err, rows) {
                if (!err && rows.length > 0) {
                    res.json(rows);
                } else {
                    res.json([]);
                }
            });
    });
});

// Cadastrar espetaculos
router.post('/', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var dados = req.body;
        var nome = dados.nome;
        var data = dados.data;

        connection.query(
            "INSERT INTO espetaculo (nome, data) VALUES ('"
            + nome + "','"
            + data +
            "')", function (err, rows) {

                if (rows.affectedRows) {
                    connection.query("SELECT * FROM espetaculo WHERE id='" + rows.insertId
                        + "' LIMIT 1", function (err, rows) {
                            if (!err && rows.length > 0) {
                                res.json(rows);
                            } else {
                                res.json([]);
                            }
                        });
                }
            });
    });
});

// Excluir espetaculo
router.delete('/:id', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var id = req.params.id;
        connection.query("DELETE FROM espetaculo WHERE id='" + id +
            "'", function (err, rows) {
                if (!err) {
                    res.json({
                        "Excluído": true
                    });
                } else {
                    res.json([]);
                }
            });
    });
});

// Modificar espetaculo
router.put('/:id', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var dados = req.body;
        var id = req.params.id;
        var nome = dados.nome;
        var data = dados.data;

        connection.query(
            "UPDATE espetaculo SET nome='" + nome +
            "', data='" + data +
            "'WHERE id='" + id +
            "'", function (err, rows) {

                if (rows.affectedRows) {
                    connection.query("SELECT * FROM espetaculo WHERE id='" + id
                        + "' LIMIT 1", function (err, rows) {
                            if (!err && rows.length > 0) {
                                res.json(rows[0]);
                            } else {
                                res.json([]);
                            }
                        });
                }
            });
    });
});

module.exports = router;