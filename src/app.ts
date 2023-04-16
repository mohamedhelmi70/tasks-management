import { appConfig } from "./config"
import compression from "compression"
import helmet from "helmet"
import cors from "cors"
import sequelize from "./app/models"
import rootRouter from "./rootRouter"
// import * as db from "./db"
import { createServer, Server as HTTPServer } from "http"
import express, { Application } from "express"

export class App {
  private httpServer: HTTPServer
  public app: Application
  private readonly port = appConfig.port

  constructor() {
    this.initialize()
    this.handleRoutes()
  }

  private initialize(): void {
    this.app = express()
    this.httpServer = createServer(this.app)
  }

  private handleRoutes(): void {
    this.app.use(cors())
    this.app.use(express.json()) // parse json request body
    this.app.use(express.urlencoded({ extended: true })) // parse urlencoded request body
    this.app.use(compression())
    this.app.use(helmet())
    rootRouter(this.app)
    this.app.use((error, req, res, next) => {
      const status = error.statusCode || 500
      const message = error.message
      const errors = error.errors || []
      res.status(status).json({ message: message, errors: errors })
    })
  }

  public listen(callback: (port: number) => void): void {
    this.httpServer.listen(this.port, () => callback(this.port))
  }
}

// Sync DB.
// (async () => {
// 	try {
//     await sequelize.authenticate().then(async () => {
//       await sequelize.sync({ alter: true });
//       console.log('sync finished');
//     });
// 	} catch (e) {
// 		console.log(e);
// 	}
// })();