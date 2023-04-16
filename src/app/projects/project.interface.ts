import { IUser } from "../users/user.interface";

export interface IProject {
    id: string
    name: string;
    status: ProjectStatus;
    userId?: string;
    reference: number

    user?: IUser;
}

export enum ProjectStatus {
    ACTIVE = "ACTIVE",
    DELETED = "DELETED",
}