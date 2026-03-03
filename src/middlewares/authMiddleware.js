export function verificarLogin(req, res, next) {

  if (!req.session.userId) {
    return res.status(401).json({ erro: "Usuário não autenticado." });
  }

  next();
}