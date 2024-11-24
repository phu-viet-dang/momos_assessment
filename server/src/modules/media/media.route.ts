import express from "express";
import mediaController from "./media.controller";
import mediaValidator from "./media.validator";

const mediaRouter = express.Router();

mediaRouter.get(
  "/",
  mediaValidator.getMediaParamsValidator,
  mediaController.getList
);
mediaRouter.post(
  "/scrape-urls",
  mediaValidator.urlsValidator,
  mediaController.scrapeMediasFromUrls
);

export default mediaRouter;
