import { Application } from "express"
import { MainRouter as Main } from "./app/router";

function router(app: Application) {
  app.use("/api", new Main().router)
}

export default router;
