/* 
Categoria tem: id, categoria

O que espero aqui:
- Criar categoria VVV
- Buscar todas as categorias VVV
- Consultar categoria específica por id VVV
- Editar categoria VVV
- Deletar categoria VVV
*/


import { Categoria } from "../models/index.js";

class CategoriaRepository {

    async createCategoria(dados) {
        return await Categoria.create(dados)
    }
    async getCategorias() {
        return await Categoria.findAll();
    }

    async getCategoria(id) {
        return await Categoria.findByPk(id);
    }

    async editCategoria(id, dados) {
        return await Categoria.update( { dados, where: { id: id } } )
    }

    async deleteCategoria(id) {
        return await Categoria.destroy( { where: { id: id} } );
    }

}

export default new CategoriaRepository;