//Business logic for all user routes
import { Project } from "../../db"
import MainProvider from "../../index.provider"
import { GetProjectsFilterDto } from "./dto/get-projects-filter.dto"
import { CreateProjectDto } from "./dto/create-project.dto"
import { IProject } from "./project.interface"

export default class ProjectsService extends MainProvider {
    constructor() {
        super("projects")
    }

    async getProjects (filterDto: GetProjectsFilterDto): Promise<{projects: IProject[], meta: any}> {
        const {search, page, perPage} = filterDto;
        
        const {count, rows} = await Project.findAndCountAll({
            attributes: ['id', 'name'],
            order: [["createdAt", "DESC"]],
            limit: Number(perPage),
            offset: (Number(page) - 1) * Number(perPage),
        })

        return {projects: rows, meta: {total: count, page, perPage}}
    }

    async createProject (createProjectDto: CreateProjectDto): Promise<{project: IProject}> {
        const project = await Project.create(createProjectDto);
        return {project}
    }
}