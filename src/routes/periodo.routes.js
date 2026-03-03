import { Router } from "express";
import { verificarLogin } from "../middlewares/authMiddleware.js";
import { PeriodoController } from "../controllers/index.js";

const router = Router()

router.post("/criar", verificarLogin, PeriodoController.createPeriodo) // cria periodo novo
router.get("/meus_periodos", verificarLogin, PeriodoController.getPeriodosByUser) // verifica todos os periodos de um usuario
router.get("/atual", verificarLogin, PeriodoController.getAtualByUser) // verifica periodo atual do usuario
router.get("/periodo/:id", verificarLogin, PeriodoController.getPeriodo) // verifica um periodo especifico

export default router