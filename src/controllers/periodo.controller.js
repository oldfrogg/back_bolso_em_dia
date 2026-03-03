import { PeriodoService } from "../services/index.js"

class PeriodoController {
    async createPeriodo(req, res) {
        try {
            const userId = req.session.userId
            const dados = { user_id: userId, inicio: req.body.inicio, fim: req.body.fim }
            const periodo = await PeriodoService.createPeriodo(dados)
            res.status(201).json(periodo)
        } catch (error) {
            res.status(400).json({ erro: error.message })
        }
    }

    async getPeriodosByUser(req, res) {
        try {
            const userId = Number(req.session.userId)
            const periodos = await PeriodoService.getPeriodosByUser(userId)
            res.status(200).json(periodos)
        } catch (error) {
            res.status(400).json({ erro: error.message })
        }
    }

    // lembrando: cada linha tem um id de usuario tbm; nao ha risco de dois usuarios terem um periodo com id compartilhado
    async getPeriodo(req, res) {
        try {
            const { id } = req.params
            const userId = req.session.userId
            const periodo = await PeriodoService.getPeriodo(id, userId)
            res.status(200).json(periodo)
        } catch (error) {
            res.status(400).json({ erro: error.message })
        }
    }

    async getAtualByUser(req, res) {
        try {
            const userId = req.session.userId
            const periodo = await PeriodoService.getAtualByUser(userId)
            res.status(200).json(periodo)
        } catch (error) {
            res.status(404).json({ erro: error.message })
        }
    }
}

export default new PeriodoController