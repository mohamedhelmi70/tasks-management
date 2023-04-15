import { Application } from "express"
import { MainRouter } from "./app/router";

function router(app: Application) {
  app.use("/api", new MainRouter().router)
}

export default router;
