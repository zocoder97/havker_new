import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";

class User extends Model {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public age!: number;
    public profilPicture!: string;
    public description!: string;
    public isVisible!: boolean;
}

User.init(
    {
        username: { type: DataTypes.STRING, allowNull: false ,unique:true},
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        age: { type: DataTypes.INTEGER },
        profilPicture: { type: DataTypes.STRING },
        description: { type: DataTypes.TEXT },
        isVisible: { type: DataTypes.BOOLEAN },

    },
    { sequelize, tableName: "users" }
);

export default User;