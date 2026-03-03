import { TransacaoService } from "../services/index.js";

class TransacaoController {

    async createTransacao(req, res) {
        try {
            const userId = req.session.userId
            let dados = req.body
            dados.user_id = userId
            const transacao = await TransacaoService.createTransacao(dados, userId)
            res.status(201).json(transacao)
        } catch (error) {
            res.status(400).json({ erro: error.message })
        }
    }

    async getTransacao(req, res) {
        try {
            const { id } = req.params
            const userId = req.session.userId
            const transacao = await TransacaoService.getTransacao(id, userId)
            res.status(200).json(transacao)
        } catch (error) {
            res.status(404).json({ erro: error.message })
        }
    }

    async getTransacoesByUser(req, res) {

        try {
            const user_id = req.session.userId
            const transacoes = await TransacaoService.getTransacoesByUser(user_id)
            res.status(200).json(transacoes)
        } catch (error) {
            res.status(404).json({ erro: error.message })
        }
    }

    async getTransacoesByUserAndPeriodo(req, res) {

        try {
            const userId = req.session.userId
            const { periodoId } = req.params
            const transacoes = await TransacaoService.getTransacoesByUserAndPeriodo(userId, periodoId)
            res.status(200).json(transacoes)
        } catch (error) {
            res.status(404).json({ erro: error.message })
        }
    }

    async editTransacao(req, res) {
        try {
            const { id } = req.params
            const userId = req.session.userId
            let dados = req.body
            dados.user_id = userId
            await TransacaoService.editTransacao(id, dados, userId)
            res.status(200).json({ mensagem: "Transacao alterada!" })
        } catch (error) {
            res.status(400).json({ erro: error.message })
        }
    }

    async deleteTransacao(req, res) {
        try {
            const { id } = req.params
            const userId = req.session.userId
            await TransacaoService.deleteTransacao(id, userId)
            res.status(200).json({ mensagem: "Transacao excluída!" })
        } catch (error) {
            res.status(400).json({ erro: error.message })
        }
    }

}

export default new TransacaoController