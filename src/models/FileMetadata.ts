import { Model, Sequelize, DataTypes } from "sequelize";
import { FileMetadataAttributes, FileMetadataInput } from "../types/models/File";

export class FileMetadata extends Model<FileMetadataAttributes, FileMetadataInput> implements FileMetadataAttributes {
	declare id: string;
	declare name: string;
	declare extension: string;
	declare mimeType: string;
}

export function init(sequelize: Sequelize) {
	FileMetadata.init({
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [ 0, 255 ]
			},
		},
		extension: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [ 0, 32 ]
			}
		},
		mimeType: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [ 0, 255 ]
			}
		}
	}, {
		sequelize,
		tableName: "FileMetadata"
	});
}

export function associate(): void {

}