import { DataTypes, Model, Sequelize } from "sequelize";
import { UserAttributes, UserInput } from "../types/models/User";

export class User extends Model<UserInput, UserInput> implements UserAttributes {
    declare id: number;
	declare email: string;
	declare firstName: string;
	declare lastName: string;

	declare hashedPassword: string;
}

export function init(sequelize: Sequelize): void {
	User.init({
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
				len: [ 0, 255 ]
			},
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [ 0, 255 ]
			},
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [ 0, 255 ]
			},
		},
		hashedPassword: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, 
	{
		sequelize,
		tableName: "User"
	});
}

export function associate(): void {

}