import { Router } from "express";
import { verificarLogin } from "../middlewares/authMiddleware.js";
import { TransacaoController } from "../controllers/index.js";

const router = Router()

router.post("/criar", verificarLogin, TransacaoController.createTransacao)
router.get("/transacao/:id", verificarLogin,TransacaoController.getTransacao) // mostra transacao por id
router.get("/minhas_transacoes", verificarLogin,TransacaoController.getTransacoesByUser)
router.get("/periodo/:periodoId", verificarLogin,TransacaoController.getTransacoesByUserAndPeriodo)
router.put("/editar/:id", verificarLogin,TransacaoController.editTransacao)
router.delete("/deletar/:id", verificarLogin,TransacaoController.deleteTransacao)

export default router