import { DataTypes } from "sequelize"; // para poder definir os tipos de dados
import sequelize from "../config/db.js"; // importando os dados do DB, definido em db.js

const Usuario = sequelize.define('Usuario', {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING(32), allowNull: false, unique: true },
    senha: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    dia_base: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 28 }, defaultValue: 1 },
    contar_agendamento: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    is_admin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
}, {
    tableName: 'usuarios',
    timestamps: false
});

export default Usuario;

