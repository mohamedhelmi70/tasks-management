import { DataTypes, Model } from "sequelize"
import sequelize from "."
import { IProject, ProjectStatus } from "../projects/project.interface"

export default class Project extends Model<IProject> implements IProject {
  declare readonly id: string
  declare name: string
  declare status: ProjectStatus
  declare reference: number
  declare createdAt?: Date
  declare updatedAt?: Date
}

Project.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reference: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(ProjectStatus)),
      allowNull: false,
      defaultValue: ProjectStatus.ACTIVE,
    },
  },
  {
    sequelize,
    modelName: "projects",
  },
)
