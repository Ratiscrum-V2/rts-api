import { DataTypes, Model, Sequelize } from "sequelize";
import { UserAttributes, UserInput } from "../types/models/User";

export class User
  extends Model<UserAttributes, UserInput>
  implements UserAttributes
{
  declare id: number;
  declare email: string;
  declare nickname: string;
  declare TWOFASecret?: string;
  declare hashedPassword: string;
}

export function init(sequelize: Sequelize): void {
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          len: [0, 255],
        },
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      TWOFASecret: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "User",
    }
  );
}

export function associate(): void {}
