import { Router } from "express"
import { verificarLogin } from "../middlewares/authMiddleware.js";
import { UsuarioController } from "../controllers/index.js"

const router = Router()

router.post("/criar", UsuarioController.createUsuario)
router.get("/", UsuarioController.getUsuarios) // será apenas para admin futuramente
router.get("/usuario", verificarLogin, UsuarioController.getUsuario)
router.put("/editar", verificarLogin ,UsuarioController.editUsuario)
router.delete("/deletar", verificarLogin, UsuarioController.deleteUsuario)

export default router