/* 
Transacao tem: id, user_id (FK), categoria_id (FK), periodo_id (FK), valor, descricao, data_transacao, is_entrada, is_agendado, created_at

O que espero aqui:
- Criar transacao, atribuindo user_id, categoria_id, periodo_id, valor, descricao, data_transacao, is_entrada, is_agendado - createTransacao VVV 
- Consultar transação específica por id - getTransacao(id) VVV
- Consultar todas as transacoes de um usuario -getTransacoesByUser VVV
- Consultar todas as transacoes de um usuario em um período - getTransacoesByUserAndPeriodo VVV
- Consultar transacoes de um usuario em uma categoria - getTransacoesByUserAndCategoria VVV
- Consultar transacoes de um usuario em uma categoria em um periodo - Get TransacoesByUserAndCategoriaAndPeriodo VVV
- Editar transação - editTransacao VVV
- Deletar transação - deleteTransacao VVV
*/

import { Transacao } from "../models/index.js";

class TransacaoRepository {

    async createTransacao(dados) {
        return await Transacao.create(dados)
    }

    async getTransacao(id) {
        return await Transacao.findByPk(id);
    }

    // Consultar todas as transacoes de um usuario
    async getTransacoesByUser(user_id) {
        return await Transacao.findAll({ where: { user_id } })
    }

    // Consultar todas as transacoes de um usuario em um período
    async getTransacoesByUserAndPeriodo(user_id, periodo_id) {
        return await Transacao.findAll({ where: { user_id, periodo_id }, order: [["data_transacao", "ASC"]] })
    }

    async getTransacoesByUserAndCategoria(user_id, categoria_id) {
        return await Transacao.findAll({ where: { user_id, categoria_id } })
    }

    async getTransacoesByUserAndCategoriaAndPeriodo(user_id, categoria_id, periodo_id) {
        return await Transacao.findAll({ where: { user_id, categoria_id, periodo_id } })
    }

    async editTransacao(id, dados) {
        return await Transacao.update( dados, { where: { id: id } })
    }

    async deleteTransacao(id) {
        return await Transacao.destroy({ where: { id: id } });
    }

}

export default new TransacaoRepository;