import { UsuarioService } from "../services/index.js";

class AuthController {
    async login(req, res) {
        try {
            const { username, senha } = req.body;
            const usuario = await UsuarioService.login(username, senha);

            req.session.userId = usuario.id;
            res.json({ mensagem: "Login realizado" });
        } catch (error) {
            res.status(401).json({ erro: error.message });
        }
    }

    async logout(req, res) {
        req.session.destroy((error) => {
            if (error) {
                return res.status(500).json({ erro: "Erro ao fazer logout." });
            }

            res.clearCookie("connect.sid");
            res.json({ mensagem: "Logout realizado com sucesso." });
        });
    }
}

export default new AuthController()