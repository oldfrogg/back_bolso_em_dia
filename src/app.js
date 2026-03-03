// POST /auth/login
// POST /auth/register

// GET /users (se admin)
// GET /users/id
// DELETE /users/:id (se admin ou proprio usuario)
// PUT /user/:id (se admin ou próprio usuário)

// GET /transacoes
// POST /transacoes
// PUT /transacoes/:id (se periodo_id for NULL)
// DELETE /transacoes/:id

// GET /periodo
// GET /periodo/percentual
// GET /periodo/saldo
// GET /periodos
// GET /periodo/fechar (criada ao final de um período)

// GET /categorias

// GET /configs (dia_base e contar_agendamentos)
// PUT /configs

import "dotenv/config";
import express from "express";
import UsuarioRepository from "./repositories/usuario.repository.js";
import session from "express-session";
import {authRoutes, UsuarioRoutes, CategoriaRoutes, PeriodoRoutes, TransacaoRoutes} from "./routes/index.js"



const PORT = process.env.port || 3000;

const app = express();
app.use(express.json());
// utilizo o express.json() em todas as requisições manejadas pelo express

app.use(session({
  secret: "segredo-super-simples",
  resave: false,
  saveUninitialized: false
}));

app.use("/auth", authRoutes);
app.use("/usuarios", UsuarioRoutes);
app.use("/categorias", CategoriaRoutes);
app.use("/periodos", PeriodoRoutes);
app.use("/transacoes", TransacaoRoutes);


app.get("/", (req, res) => {
    res.status(200).send("Hello, World!");
});

app.get("/teste", async (req, res) => {
    try {
        const usuarios = await UsuarioRepository.getUsuarios();
    res.status(200).json(usuarios)
    } catch(error) {
        res.status(500).json({error: "Erro ao listar usuários"})
    }
})

app.listen(PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}...`);
});

export default app;
