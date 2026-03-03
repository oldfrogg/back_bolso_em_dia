import { UsuarioService } from "../services/index.js"

class UsuarioController {
    async createUsuario(req, res) {
        try {
            const userId = req.session.userId
            const usuario = await UsuarioService.createUsuario(req.body, userId)
            res.status(201).json(usuario)
        } catch (error) {
            res.status(400).json({ erro: error.message })
        }
    }

    async getUsuarios(req, res) {
        try {
            const usuarios = await UsuarioService.getUsuarios()
            res.status(200).json(usuarios) // Não é necessário colocar o status 200, pois é o padrão que o express envia
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }

    async getUsuario(req, res) {
        try {
            const id = req.session.userId
            const usuario = await UsuarioService.getUsuario(id)
            res.status(200).json(usuario)
        } catch (error) {
            res.status(404).json({ erro: error.message })
        }
    }

    async editUsuario(req, res) {
        try {
            const id = req.session.userId
            const dados = req.body
            dados.user_id = id
            await UsuarioService.editUsuario(id, dados)
            res.status(200).json({ mensagem: "Usuário atualizado." })
        } catch (error) {
            res.status(400).json({ erro: error.message })
        }
    }

    async deleteUsuario(req, res) {
        try {
            const id = req.session.userId
            await UsuarioService.deleteUsuario(id)
            res.status(200).json({ mensagem: "Usuário excluído com sucesso" })
        } catch (error) {
            res.status(400).json({ erro: error.message })
        }
    }



}

export default new UsuarioController