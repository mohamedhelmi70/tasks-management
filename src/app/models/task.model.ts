import { DataTypes, Model } from "sequelize"
import sequelize from "."
import { ITask, TaskStatus } from "../tasks/task.interface"

export default class Task extends Model<ITask> implements ITask {
  declare readonly id: string
  declare title: string
  declare status: TaskStatus
  declare reference: number
  declare createdAt?: Date
  declare updatedAt?: Date
}

Task.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
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
      type: DataTypes.ENUM(...Object.values(TaskStatus)),
      allowNull: false,
      defaultValue: TaskStatus.BACKLOG,
    },
  },
  {
    sequelize,
    modelName: "tasks",
  },
)
