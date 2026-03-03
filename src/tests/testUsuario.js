import "../services/index.js"
import { UsuarioService, PeriodoService, CategoriaService, TransacaoService } from "../services/index.js"

async function runTests() {
    console.log("======= TESTES EM EXECUCAO... ========")

    // Criar usuário
    console.log("===Criando novo usuário teste...===")
    try {
        const usuario = await UsuarioService.createUsuario({
            username: "teste",
            email: "teste@teste.com",
            senha: "teste123"
        })
        console.log("Usuário criado criado com sucesso.")
        console.log("Usuário criado:", usuario.id)

        console.log("===LISTANDO TODOS OS USUÁRIOS===")

        const usuarios = await UsuarioService.getUsuarios()
        console.log(usuarios)


        console.log("===DELETANDO USUARIO CRIADO===")
        console.log("*Deletando usuário de id...*")
        console.log(usuario.id)


        await UsuarioService.deleteUsuario(usuario.id)
        console.log("Usuário criado no teste deletado.")
        console.log("======= TESTE FINALIZADO COM SUCESSO =======")

    } catch (error) {
        console.log("Erro na execução do teste.")
    }


}

runTests()