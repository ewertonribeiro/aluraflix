import { Router } from "express";
import { videosController } from "../Controllers";
import { videosMiddleware } from "../Middlewares";

const videosRouter = Router();


videosRouter.get("/", videosController.getAllVideos);
videosRouter.get("/video", videosController.searchVideos);
videosRouter.get("/:id", videosController.getVideoById);
videosRouter.post("/", videosMiddleware.createNewVideo, videosController.createNewVideo);
videosRouter.put("/:id", videosMiddleware.verifyToUpdate, videosController.updateAVideo);
videosRouter.delete("/:id", videosController.deleteVideoById);

export default videosRouter;
