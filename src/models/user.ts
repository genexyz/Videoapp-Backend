import { Model, DataTypes, Sequelize } from "sequelize";

export default class User extends Model {
  declare id: number;
  declare email: string;
  declare password: string;
  declare name: string;
  declare bio: string;
  declare imageUrl: string;
  declare role: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  public toJSON() {
    const values = { ...this.get() };
    delete values.password;
    return values;
  }
}

export const initUser = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "No bio yet",
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "https://cdn-icons-png.flaticon.com/512/3237/3237472.png",
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "student",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "users",
    }
  );
};
