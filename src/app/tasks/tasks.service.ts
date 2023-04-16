//Business logic for all user routes
import { Project, Task } from "../../db"
import MainProvider from "../../index.provider"
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto"
import { CreateTaskDto } from "./dto/create-task.dto"
import { ITask } from "./task.interface"

export default class TasksService extends MainProvider {
    constructor() {
        super("tasks")
    }

    async getTasks (filterDto: GetTasksFilterDto): Promise<{tasks: ITask[], meta: any}> {
        const {search, status, page, perPage} = filterDto;
        
        const {count, rows} = await Task.findAndCountAll({
            attributes: ['id', 'title', 'status'],
            include: [
                { model: Project, attributes: ["id", "name"] }
            ],
            order: [["createdAt", "DESC"]],
            limit: Number(perPage),
            offset: (Number(page) - 1) * Number(perPage),
        })

        return {tasks: rows, meta: {total: count, page, perPage}}
    }

    async createTask (createTaskDto: CreateTaskDto): Promise<{task: ITask}> {
        const task = await Task.create(createTaskDto);
        return {task}
    }
}