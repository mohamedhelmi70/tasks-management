import { Router } from "express"
import { body, query } from "express-validator"
import ProjectsController from "./projects.controller"
import validateFields from "../middlewares/validate-fields"
import { isAuth } from "../middlewares/auth"

export default class ProjectsRouter {
	router: Router
	private projectsController = new ProjectsController()

	constructor() {
		this.router = Router()
		this.routes()
	}

	private routes() {
		//GET - List Projects.
		this.router.get("/projects", isAuth, this.validator("list"), validateFields, this.projectsController.getProjects);
		//POST - Create Project.
		this.router.post("/projects", isAuth, this.validator("createProject"), validateFields, this.projectsController.createProject);
	}

	private validator(route: string) {
		if (route == "list") {
			return [
				query("search").optional().trim().isString(),
			]
		}  else if (route == "createProject") {
			return [
				body("name").trim().notEmpty().isString(),
			]
		}
	}
}