/* 
Usuario tem: id, username, senha, email, dia_base, contar_agendamento, created_at, is_admin

O que espero aqui:
- Criar usuario VVV
- Buscar usuário por id VVV
- Buscar usuário por username VVV
- Editar usuário VVV
- Deletar usuário VVV
*/

import { Usuario } from "../models/index.js";

class UsuarioRepository {

    async createUsuario(dados) {
        return await Usuario.create(dados)
    }

    async getUsuarios() {
        return await Usuario.findAll({ attributes: { exclude: ["senha"] } });
    }

    async getUsuario(id) {
        return await Usuario.findByPk(id);
    }

    async getUsuarioByUsername(username) {
        return await Usuario.findOne({ where: {username: username} })
    }

    async editUsuario(id, dados) {
        return await Usuario.update( dados, { where: { id: id } })
    }

    async deleteUsuario(id) {
        return await Usuario.destroy({ where: { id: id } });
    }

}

export default new UsuarioRepository;