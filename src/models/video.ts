import { Model, Sequelize, DataTypes } from "sequelize";

export default class Video extends Model {
  declare id: string;
  declare title: string;
  declare description: string;
  declare url: string;
  declare thumbnail: string;
  declare published: boolean;
  declare publishedAt?: Date;
  declare userId: string;
  declare likesAmount: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export const initVideo = (sequelize: Sequelize) => {
  Video.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      publishedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      likesAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      userId: {
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
      tableName: "videos",
    }
  );
};
