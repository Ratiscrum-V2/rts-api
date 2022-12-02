import { Model, Sequelize, DataTypes } from "sequelize";
import { QuestionAttributes, QuestionInput } from "../types/models/Question";
import { Comment } from "./Comment";

export class Question
	extends Model<QuestionAttributes, QuestionInput>
	implements QuestionAttributes
{
	declare id: number;
	declare title: string;
	declare description?: string;
	declare medias: number[];
}

export function init(sequelize: Sequelize): void {
	Question.init(
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			medias: {
				type: DataTypes.ARRAY(DataTypes.INTEGER),
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "Question",
		}
	);
}

export function associate(): void {

	Question.hasMany(Comment, {
		sourceKey: "id",
		foreignKey: "questionId",
		onDelete: "cascade"
	});

}
