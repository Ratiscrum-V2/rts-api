import { Model, Sequelize, DataTypes } from "sequelize";
import { CommentAttributes, CommentInput } from "../types/models/Comment";

export class Comment
  extends Model<CommentAttributes, CommentInput>
  implements CommentAttributes
{
  declare id: number;
  declare title: string;
  declare message: string;
  declare verified: boolean;
}

export function init(sequelize: Sequelize): void {
    Comment.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Comment",
    }
  );
}

export function associate(): void {}
