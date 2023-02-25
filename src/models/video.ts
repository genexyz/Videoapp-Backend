import { Model, Sequelize, DataTypes } from "sequelize";

export default class Video extends Model {
  declare id: string;
  declare title: string;
  declare description: string;
  declare url: string;
  declare thumbnail: string;
  declare published: boolean;
  declare publishedAt?: Date;
  declare likes: number;
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
      likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "videos",
    }
  );
  sequelize.sync();
};
