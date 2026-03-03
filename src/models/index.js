import Usuario from "./usuario.model.js";
import Categoria from "./categoria.model.js";
import Periodo from "./periodo.model.js";
import Transacao from "./transacao.model.js";

Usuario.hasMany(Transacao, { foreignKey: 'user_id' });
Transacao.belongsTo(Usuario, { foreignKey: 'user_id' });

Usuario.hasMany(Periodo, { foreignKey: 'user_id' });
Periodo.belongsTo(Usuario, { foreignKey: 'user_id' });

Categoria.hasMany(Transacao, { foreignKey: 'categoria_id' });
Transacao.belongsTo(Categoria, { foreignKey: 'categoria_id' });

Periodo.hasMany(Transacao, { foreignKey: 'periodo_id' });
Transacao.belongsTo(Periodo, { foreignKey: 'periodo_id' });


export {
    Usuario,
    Categoria,
    Periodo,
    Transacao
};