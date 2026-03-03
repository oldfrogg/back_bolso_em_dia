import { PeriodoRepository, UsuarioRepository } from "../repositories/index.js";

class PeriodoService {

    validarId(id) {
        if (!id || isNaN(id)) {
            throw new Error("Id inválido.")
        }
    }

    async calcularDatas(userId) {

        const usuario = await UsuarioRepository.getUsuario(userId);

        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        const diaBase = usuario.dia_base;
        const hoje = new Date();

        let inicio;
        let fim;

        const ano = hoje.getFullYear();
        const mes = hoje.getMonth(); // 0-11

        if (hoje.getDate() >= diaBase) {
            // período começou este mês
            inicio = new Date(ano, mes, diaBase);
            fim = new Date(ano, mes + 1, diaBase - 1);
        } else {
            // período começou mês passado
            inicio = new Date(ano, mes - 1, diaBase);
            fim = new Date(ano, mes, diaBase - 1);
        }

        return {
            inicio: inicio.toISOString().split("T")[0],
            fim: fim.toISOString().split("T")[0]
        };
    }

    async createPeriodo(dados) {
        this.validarId(dados.user_id)
        return await PeriodoRepository.createPeriodo(dados)
    }

    async getPeriodosByUser(user_id) {
        this.validarId(user_id)
        return await PeriodoRepository.getPeriodosByUser(user_id)
    }

    async getPeriodo(id, userId) {
        this.validarId(id)

        const periodo = await PeriodoRepository.getPeriodo(id)

        if (!periodo) {
            throw new Error("Período não encontrado")
        }

        if (periodo.user_id !== userId) {
            throw new Error("Acesso negado")
        }

        return periodo
    }

    async getAtualByUser(userId) {
        this.validarId(userId)

        // tento buscar o periodo
        let periodo = await PeriodoRepository.getAtualByUser(userId)

        // se não existir periodo, crio um novo;
        if (!periodo) {
            const { inicio, fim } = await this.calcularDatas(userId)
            periodo = await this.createPeriodo({ user_id: userId, inicio, fim })
        }
        return periodo
    }

}

export default new PeriodoService