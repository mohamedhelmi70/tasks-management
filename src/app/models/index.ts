import Sequelize from "sequelize"
import { appConfig, dbConfig } from "../../config"

const sequelize = new Sequelize.Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: "mysql",
  port: Number(dbConfig.PORT),
  logging: appConfig.env == "test" ? false : console.log,
  define: {
    charset: "utf8",
    timestamps: true,
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  dialectOptions: dbConfig.dialectOptions,
})

/**
 * Solve count wrong in <findAndCountAll()>
 * Add a permanent global hook to prevent unknowingly hitting this Sequelize bug:
 * https://github.com/sequelize/sequelize/issues/10557
 */
sequelize.addHook("beforeCount", function (options) {
  if (options.distinct === undefined) {
    if (this._scope.include && this._scope.include.length > 0) {
      options.distinct = true
      options.col = this._scope.col || options.col || `"${this.options.name.singular}".id`
    }
    if (options.include) {
      options.include = null
    }
  }
})

export default sequelize
