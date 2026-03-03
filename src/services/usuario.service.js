//Aqui irei adicionar também o login

import { UsuarioRepository } from "../repositories/index.js"

class UsuarioService {

    validarDados(dados) {
        if (!dados.username || dados.username.trim() === "") {
            throw new Error("Username é obrigatório!")
        }

        if (!dados.senha || dados.senha.trim() === "") {
            throw new Error("Senha é obrigatório!")
        }

        if (!dados.email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(dados.email)) {
            throw new Error("Email inválido");
        }

        if (dados.dia_base && (isNaN(dados.dia_base) || dados.dia_base < 1 || dados.dia_base > 28)) {
            throw new Error("Dia Base deve ser um número válido e estar entre 1 e 28.")
        }

        if (dados.contar_agendamento !== undefined && typeof dados.contar_agendamento !== "boolean") {
            throw new Error("Contar agendamento deve ser booleano");
        }
    }

    validarId(id) {
        if (isNaN(id)) {
            throw new Error("Id inválido.");
        }
    }

    async createUsuario(dados) {

        this.validarDados(dados)

        try {
            return await UsuarioRepository.createUsuario(dados);
        } catch (error) {
            if (error.name === "SequelizeUniqueConstraintError") {
                throw new Error("Username ou e-mail já existem")
            }
            throw error
        }

    }

    async getUsuarios() {
        return await UsuarioRepository.getUsuarios();
    }

    async getUsuario(id) {

        this.validarId(id)

        const usuario = await UsuarioRepository.getUsuario(id);

        if (!usuario) {
            throw new Error("Usuário não encontrado.")
        }

        return usuario;
    }

    async getUsuarioByUsername(username) {
        if (!username) {
            throw new Error("Necessário inserir username")
        }
        return await UsuarioRepository.getUsuarioByUsername(username)
    }

    async editUsuario(id, dados) {

        await this.getUsuario(id) // verifico se há cliente com esse id

        this.validarDados(dados)

        try {
            await UsuarioRepository.editUsuario(id, dados)
        } catch (error) {
            if (error.name === "SequelizeUniqueConstraintError") {
                throw new Error("Username ou e-mail já existem");
            }
        }
    }

    async deleteUsuario(id) {
        // verifico se há cliente com esse id. Se não, um erro eh lancado la no getUsuario mesmo
        await this.getUsuario(id)

        const deletado = await UsuarioRepository.deleteUsuario(id)

        if (!deletado) {
            throw new Error("Houve um erro ao excluir usuário.")
        }
        return
    }

    async login(username, senha) {

        const usuario = await UsuarioRepository.getUsuarioByUsername(username);

        if (!usuario) {
            throw new Error("Usuário não encontrado.");
        }

        if (usuario.senha !== senha) {
            throw new Error("Senha inválida.");
        }

        return usuario;
    }
}

export default new UsuarioService;