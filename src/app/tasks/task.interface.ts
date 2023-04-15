import { IUser } from "../users/user.interface";

export interface ITask {
    id: string
    title: string;
    status: TaskStatus;
    projectId?: string;
    userId?: string;
    reference: number

    user?: IUser;
}

export enum TaskStatus {
    BACKLOG = "BACKLOG",
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    IN_REVIEW = 'IN_REVIEW',
    COMPLETED = "COMPLETED",
}