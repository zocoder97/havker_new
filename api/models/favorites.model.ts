import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";

class Favories extends Model {
    public id!: number;
    public userId!: number;
    public storyId!: number;
}

Favories.init(
    {
        userId: { type: DataTypes.INTEGER, allowNull: false},
        storyId: { type: DataTypes.INTEGER, allowNull: false}

    },
    { sequelize, tableName: "favories" }
);

export default Favories;