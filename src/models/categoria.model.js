import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Categoria = sequelize.define('Categoria', {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    categoria: { type: DataTypes.STRING(32), allowNull: false, unique: true }
}, {
    tableName: 'categorias',
    timestamps: false
});
export default Categoria;

