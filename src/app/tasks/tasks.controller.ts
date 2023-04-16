import { Request, Response, NextFunction } from "express"
import { CatchError } from "../utils/error"
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import TasksService from "./tasks.service";

export default class TasksController {
    private tasksService = new TasksService()

    /**
     * List Board Tasks
     * @param {body}
     * @param res success | fail
     * @param next
     */
    async getTasks (req: Request, res: Response, next: NextFunction) {
        try {
            const getTasksFilterDto: GetTasksFilterDto = req.query;
            const { tasks, meta } = await this.tasksService.getTasks(getTasksFilterDto);
            res.status(200).json({
                message: "get tasks success",
                payload: { tasks, meta },
                status: "success",
            })
        } catch (e) {
            CatchError(e, next)
        }
    }

  /**
   * Create New Task
   * @param {body}
   * @param res success | fail
   * @param next
   */
    async createTask (req: Request, res: Response, next: NextFunction) {
        try {
            const createTaskDto: CreateTaskDto = req.body;
            const { task } = await this.tasksService.createTask(createTaskDto);
            res.status(201).json({ message: "task created", payload: { task }, status: "success" });
        } catch (err) {
            CatchError(err, next)
        }
    }
}