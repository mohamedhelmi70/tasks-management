import { DataTypes, Model } from "sequelize"
import sequelize from "."
import { IUser, UserStatus } from "../users/user.interface"

export default class User extends Model<IUser> implements IUser {
  declare readonly id: string
  declare authorize: number | boolean
  declare email: string
  declare name: string
  declare password: string
  declare status: UserStatus
  declare reference: number
  declare createdAt?: Date
  declare updatedAt?: Date
}

User.init(
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
    email: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(UserStatus)),
      allowNull: false,
      defaultValue: UserStatus.ACTIVE,
    },
    reference: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    authorize: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "users",
  },
)
