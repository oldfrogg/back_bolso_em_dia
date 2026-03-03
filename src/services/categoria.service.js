import { CategoriaRepository } from "../repositories/index.js"

class CategoriaService {

    validarId(id) {
        if (isNaN(id)) {
            throw new Error("Id inválido.");
        }
    }

    async getCategorias() {
        return await CategoriaRepository.getCategorias();
    }

    async getCategoria(id) {
        this.validarId(id)

        const categoria = await CategoriaRepository.getCategoria(id)

        if(!categoria) {
            throw new Error("Categoria não existente.")
        }

        return categoria
    }

}

export default new CategoriaService