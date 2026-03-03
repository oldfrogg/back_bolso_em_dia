import { CategoriaService } from "../services/index.js";

class CategoriaController {

    async getCategorias(req, res) {
        try {
            const categorias = await CategoriaService.getCategorias()
            res.status(200).json(categorias)
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }

    async getCategoria(req, res) {
        try {
            const { id } = req.params
            const categoria = await CategoriaService.getCategoria(id)
            res.status(200).json(categoria)
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }
}

export default new CategoriaController