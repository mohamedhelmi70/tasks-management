import { Request, Response, NextFunction } from "express"
import { CatchError } from "../utils/error"
import { CreateProjectDto } from "./dto/create-project.dto";
import { GetProjectsFilterDto } from "./dto/get-projects-filter.dto";
import ProjectsService from "./projects.service";

export default class ProjectsController {
    private projectsService = new ProjectsService()

    /**
     * List Projects
     * @param {body}
     * @param res success | fail
     * @param next
     */
    async getProjects (req: Request, res: Response, next: NextFunction) {
        try {
            const getProjectsFilterDto: GetProjectsFilterDto = req.query;
            const { projects, meta } = await this.projectsService.getProjects(getProjectsFilterDto);
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
            const { project } = await this.projectsService.createProject(createProjectDto);
            res.status(201).json({ message: "project created", payload: { project }, status: "success" });
        } catch (err) {
            CatchError(err, next)
        }
    }
}