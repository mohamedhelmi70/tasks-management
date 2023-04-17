import { TaskStatus } from "../task.interface";

export class CreateTaskDto {
    title: string;
    projectId?: string;
    status: TaskStatus;
    userId: string;
}