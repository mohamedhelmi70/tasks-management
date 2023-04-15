import { Router } from "express"
import { body, query } from "express-validator"
import TasksController from "./tasks.controller"
import validateFields from "../middlewares/validate-fields"
import { TaskStatus } from "./task.interface"

export default class TasksRouter {
	router: Router
	private tasksController = new TasksController()

	constructor() {
		this.router = Router()
		this.routes()
	}

	private routes() {
		//GET - List Board.
		this.router.post("/tasks", this.validator("list"), validateFields, this.tasksController.getTasks);
		//POST - Create Task Card.
		this.router.post("/tasks", this.validator("createTask"), validateFields, this.tasksController.createTask);
	}

	private validator(route: string) {
		if (route == "list") {
			return [
				query("search").optional().trim().isString(),
				query("status").optional().trim().isIn(Object.entries(TaskStatus)),
			]
		}  else if (route == "createTask") {
			return [
				body("title").trim().notEmpty().isString(),
				body("projectId").optional().trim().isUUID(),
				body("status").optional().trim().isIn(Object.entries(TaskStatus)),
			]
		}
	}
}