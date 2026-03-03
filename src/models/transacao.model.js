import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"

const Transacao = sequelize.define('Transacao', {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }, // colocar foreignKey: 'Usuario.id' 
    categoria_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }, // colocar foreignKey: 'Categoria.id'
    periodo_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }, //  No Service (regra de negócio) algo como: defaultValue: getPeriodoId()  
    valor: { type: DataTypes.DECIMAL(12,2), allowNull: false, validate: { min: 0.01 } },
    descricao: { type: DataTypes.STRING(64), allowNull: true},
    data_transacao: { type: DataTypes.DATEONLY, allowNull: false }, // não da para utilizar DataTypes.NOW aqui, pois isso pega DATETIME. Esse default value estará só no BD.
    is_entrada: { type: DataTypes.BOOLEAN, allowNull: false }, // define se o usuário está ganhando ou gastando o valor da transação
    is_agendado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW } 
}, {
    tableName: 'transacoes',
    timestamps: false
});
export default Transacao;


// De preferência colocar as associações em arquivo separado.

// Colocar no Service como regra de negócio a garantia de que só há um período atual por usuário.
