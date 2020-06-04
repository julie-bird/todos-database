// require the Express module
const express = require("express");

//creates a new router object
const todoRoutes = express.Router();
const pool = require("./connection");

// GRAB
todoRoutes.get("/todos", (req, res) => {
    pool.query("SELECT * FROM todos ORDER BY id").then(result => {  //because it's not in Angular project, we can't use subscribe
        res.json(result.rows) //give me all the rows
    })
});


// CREATE
todoRoutes.post("/todos", (req, res) => {
    pool.query("INSERT INTO todos (todo, completed) VALUES ($1:: VARCHAR, $2:: boolean)",
        [req.body.todo, req.body.completed]).then(() => {
            res.json(req.body);
        });
});

// EDIT
todoRoutes.put("/todos/:id", (req, res) => {
    pool.query("UPDATE todos SET completed=$1::int WHERE id=$2::int", [req.body.completed, req.params.id]).then(() => {
        res.json(req.body);
    })
});

// DELETE
todoRoutes.delete("/todos/:id", (req, res) => {
    pool.query("DELETE FROM todos WHERE id=$1::int", [req.params.id]).then(() => {
        res.sendStatus(204);
    });
});

module.exports = { todoRoutes };