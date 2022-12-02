import { Model, Sequelize, DataTypes } from "sequelize";
import { ChoiceAttributes, ChoiceInput } from "../types/models/Choice";
import { StringEnumObject } from "../types/utils/Enum";

export class Choice
  extends Model<ChoiceAttributes, ChoiceInput>
  implements ChoiceAttributes
{
    declare label: string;
    declare value: string;
    declare effects: StringEnumObject;
}

export function init(sequelize: Sequelize): void {
    Choice.init(
    {
        label: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      effects: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Choice",
    }
  );
}

export function associate(): void {}
