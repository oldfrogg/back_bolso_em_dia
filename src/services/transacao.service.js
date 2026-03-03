import { TransacaoRepository } from "../repositories/index.js"
import { PeriodoService } from "./index.js";

class TransacaoService {

    validarDados(dados) {
        if (dados.user_id === undefined || dados.user_id === null) {
            throw new Error("user_id é obrigatório");
        }

        if (!dados.categoria_id) {
            throw new Error("categoria_id é obrigatório");
        }

        if (!dados.periodo_id) {
            throw new Error("periodo_id é obrigatório");
        }

        if (dados.valor === undefined || dados.valor === null) {
            throw new Error("valor é obrigatório");
        }

        if (dados.is_entrada === undefined) {
            throw new Error("is_entrada é obrigatório");
        }

        if (isNaN(dados.valor)) {
            throw new Error("Valor deve ser numérico.");
        }
    }

    validarId(id) {
        if (!id || isNaN(id)) {
            throw new Error("Id inválido.");
        }
    }

    async createTransacao(dados, userId) {
        this.validarId(userId)
        const periodo = await PeriodoService.getAtualByUser(userId) // pego o período atual ou crio um, caso não exista
        dados.periodo_id = periodo.id
        this.validarDados(dados)

        try {
            return await TransacaoRepository.createTransacao(dados)
        } catch (error) {
            throw new Error("Erro na criação da transação.")
        }
    }


    async getTransacao(id, userId) {
        this.validarId(id);
        this.validarId(userId);

        const transacao = await TransacaoRepository.getTransacao(id)

        if (!transacao) {
            throw new Error("Transacao nao encontrada.")
        }

        if (transacao.user_id !== userId) {
            throw new Error("Acesso negado")
        }

        return transacao
    }

    async getTransacoesByUser(user_id) {
        if (!user_id || isNaN(user_id)) {
            throw new Error("O id do usuário fornecido pela session não é válido.")
        }
        return await TransacaoRepository.getTransacoesByUser(user_id)
    }

    async getTransacoesByUserAndPeriodo(userId, periodoId) {
        if (!userId || isNaN(userId) || !periodoId || isNaN(periodoId)) {
            throw new Error("Necessário inserir um valor numérico para o userId e o periodoId")
        }
        return await TransacaoRepository.getTransacoesByUserAndPeriodo(userId, periodoId)
    }

    async editTransacao(id, dados, userId) {
        const periodo = await PeriodoService.getAtualByUser(userId) // pego o período atual ou crio um, caso não exista
        dados.periodo_id = periodo.id
        await this.getTransacao(id, userId) // validações necessárias no getTransacao
        this.validarDados(dados)
        try {
            return await TransacaoRepository.editTransacao(id, dados)
        } catch (error) {
            throw error
        }
    }


    async deleteTransacao(id, userId) {
        await this.getTransacao(id, userId) // validações necessárias no getTransacao
        return await TransacaoRepository.deleteTransacao(id);
    }
}

export default new TransacaoService