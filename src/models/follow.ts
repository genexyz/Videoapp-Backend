import { Model, DataTypes, Sequelize } from "sequelize";

export default class Follow extends Model {
  declare followerId: string;
  declare followingId: string;
}

export const initFollows = (sequelize: Sequelize) => {
  Follow.init(
    {
      followerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      followingId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "follows",
    }
  );
};
