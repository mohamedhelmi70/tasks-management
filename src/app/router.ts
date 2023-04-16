import routes from "./routes"
import { Router } from "express"

export class MainRouter {
    router: Router
    constructor() {
        this.router = Router()
        this.routes()
    }
    routes() {
        this.router.use("/", new routes.UserRouter().router);
        this.router.use("/", new routes.TasksRouter().router);
        this.router.use("/", new routes.ProjectsRouter().router);
    }
}