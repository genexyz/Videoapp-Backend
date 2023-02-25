import { Model, Sequelize, DataTypes } from "sequelize";
import User from "./user";
import Video from "./video";

export default class Likes extends Model {
  declare userId: string;
  declare videoId: string;
}

export const initLikes = (sequelize: Sequelize) => {
  Likes.init(
    {
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: User,
          key: "id",
        },
      },
      videoId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: Video,
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "likes",
    }
  );
};
