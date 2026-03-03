import { Router } from "express";
import { CategoriaController } from "../controllers/index.js";

const router = Router()
//getCategoria(id) e getCategorias
router.get("/", CategoriaController.getCategorias)
router.get("/:id", CategoriaController.getCategoria)

export default router