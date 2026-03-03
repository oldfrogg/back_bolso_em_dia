/* 
Período tem: id, user_id (FK), inicio (data), fim (data)

O que espero aqui:
- Criar período, atribuindo data de início e de fim - createPeriodo VVV
- Consultar todos os períodos de um usuário - getPeriodosByUser VVV
- Consultar período específico por id - getPeriodo VVV
- Consultar período atual do usuário (parametro user_id) - getAtualByUser VVV
- Editar período - editPeriodo VVV
- Deletar período - deletePeriodo VVV
*/

import { Periodo } from "../models/index.js";
import { Op } from "sequelize"; // Operadores: maior (Op.gt), >= (Op.gte), < (Op.lt), <= (Op.lte), between (Op.between), etc 


class PeriodoRepository {

    async createPeriodo(dados) {
        return await Periodo.create(dados)
    }

    // Listar todos os períodos de um usuário
    async getPeriodosByUser(user_id) {
        return await Periodo.findAll({ where: { user_id } });
    }

    async getPeriodo(id) {
        return await Periodo.findByPk(id);
    }

    // Busco um período que a data presente esteja entre o início e o fim dele.
    // inicio <= hoje <= fim
    async getAtualByUser(user_id) {
        return await Periodo.findOne({
            where: { // encontro um período, que:
                user_id: user_id,
                inicio: { [Op.lte]: new Date() }, // tenha início em data menor ou igual à data de hoje (já começou)
                // uso Op.lte (e gte) com colchetes, pois é uma chave dinâmica de objeto. Permite usar o valor da variável como chave.
                fim: { [Op.gte]: new Date() } // tenha fim em data maior que a data de hoje (ainda não terminou)
            }
        })
    }

    async editPeriodo(id, dados) {
        return await Periodo.update({ dados, where: { id: id } })
    }

    async deletePeriodo(id) {
        return await Periodo.destroy({ where: { id: id } });
    }

}

export default new PeriodoRepository;