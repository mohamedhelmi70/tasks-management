import { Request, Response, NextFunction } from "express"
import { CatchError } from "../utils/error"
import { CreateProjectDto } from "./dto/create-project.dto";
import { GetProjectsFilterDto } from "./dto/get-projects-filter.dto";
import ProjectsService from "./projects.service";

const projectsService = new ProjectsService();

export default class ProjectsController {
    /**
     * List Projects
     * @param {body}
     * @param res success | fail
     * @param next
     */
    async getProjects (req: Request, res: Response, next: NextFunction) {
        try {
            console.log('TEST')
            const getProjectsFilterDto: GetProjectsFilterDto = req.query;
            getProjectsFilterDto.page = 1;
            getProjectsFilterDto.perPage = 15;
            const { projects, meta } = await projectsService.getProjects(getProjectsFilterDto);
            res.status(200).json({
                message: "fetched success",
                payload: { projects, meta },
                status: "success",
            })
        } catch (e) {
            CatchError(e, next)
        }
    }

  /**
   * Create New Project
   * @param {body}
   * @param res success | fail
   * @param next
   */
    async createProject (req: Request, res: Response, next: NextFunction) {
        try {
            const createProjectDto: CreateProjectDto = req.body;
            createProjectDto.userId = req.userId;
            const { project } = await projectsService.createProject(createProjectDto);
            res.status(201).json({ message: "project created", payload: { project }, status: "success" });
        } catch (err) {
            CatchError(err, next)
        }
    }
}