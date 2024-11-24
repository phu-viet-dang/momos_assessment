import { NextFunction, Request, Response } from "express";
import { MediaEnum } from "./media.enum";
import MediaService from "./media.service";
import { CreateMediaDto } from "../../sequelize/models/media.model";

const getList = async (req: Request, res: Response, next: NextFunction) => {
  const { query, user } = req;
  try {
    const mediaList = await MediaService.getMediaList(
      {
        page: +query.page,
        limit: +query.limit,
        type: query.type as MediaEnum,
        searchKey: query.searchKey as string,
      },
      user.id
    );
    res.status(200).json(mediaList);
  } catch (error) {
    next(error);
  }
};

const scrapeMediasFromUrls = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const urlList: string[] = req.body.url;
    const user_id = req.user.id;
    const success_domains: string[] = [];
    const error_domains: string[] = [];

    await Promise.all(
      urlList.map(async (urlItem: string) => {
        try {
          const mediaSources = await MediaService.scrapeMedia(urlItem, user_id);
          await MediaService.bulkCreate(mediaSources);
          success_domains.push(urlItem);
        } catch (error) {
          error_domains.push(urlItem);
        }
      })
    );

    res.status(200).json({
      success_domains,
      error_domains,
    });
  } catch (error) {
    next(error);
  }
};

const mediaController = {
  getList,
  scrapeMediasFromUrls,
};
export default mediaController;
