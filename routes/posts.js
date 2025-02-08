//! Rutas del CRUD de tareas.

const express = require("express");
const router = express.Router();
const {create, getAll, getById, getByTitle, updatePost, deletePost} = require('../controllers/postControllers');

// POST /create: Endpoint para crear una publicación.
router.post("/create", create);

// GET /: Endpoint para traer todas las publicaciones.
router.get("/posts", getAll);

// GET /id/:_id: Endpoint para buscar publicación por id.
router.get("/posts/:_id", getById);

// GET /title/:title: Endpoint para buscar una publicación por su titulo.
router.get("/posts/:title", getByTitle);


// PUT /id/:_id: Endpoint para actualizar una publicación.
router.put("/posts/:_id", updatePost);
        
// DELETE /id/:_id: Endpoint para eliminar una publicación.
router.delete("/posts/:_id", deletePost);


module.exports = router;