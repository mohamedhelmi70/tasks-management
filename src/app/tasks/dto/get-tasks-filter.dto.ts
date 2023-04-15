import { TaskStatus } from "../task.interface";

export class GetTasksFilterDto {
    search?: string;
    status?: TaskStatus;
    page?: Number = 1;
    perPage?: Number = 15;
}