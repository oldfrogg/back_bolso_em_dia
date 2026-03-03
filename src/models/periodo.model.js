import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Periodo = sequelize.define('Periodo', {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    inicio: { type: DataTypes.DATEONLY, allowNull: false }, 
    fim: { type: DataTypes.DATEONLY, allowNull: false }, 
}, {
    tableName: 'periodos',
    timestamps: false
});
export default Periodo;


// Verificar no Service se o período é o atual (is_periodo_atual)
// No Service devo garantir que só há um período atual por usuário
// Colocar no Service o calculo do balanço do período
