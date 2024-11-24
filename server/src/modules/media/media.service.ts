import puppeteer, { Page } from "puppeteer";
import MediaModel, { CreateMediaDto } from "../../sequelize/models/media.model";
import { MediaEnum } from "./media.enum";
import { FindOptions, Op, WhereOptions } from "sequelize";

const getMediaList = async (
  params: {
    page: number;
    limit: number;
    type?: MediaEnum;
    searchKey?: string;
  },
  user_id: string
) => {
  const { page, limit, type, searchKey } = params;
  let findObject: any = {
    user_id: user_id,
  };

  if (type) {
    findObject.type = type;
  }

  if (searchKey) {
    findObject[Op.or] = [
      {
        domain: { [Op.iLike]: `%${searchKey}%` },
      },
      {
        url: { [Op.iLike]: `%${searchKey}%` },
      },
      {
        url: { [Op.iLike]: `%${searchKey}%` },
      },
    ];
  }

  console.log("findObject", findObject[Op.or]);

  const mediaList = await MediaModel.findAll({
    where: findObject,
    limit: +limit,
    offset: (+page - 1) * +limit,
    order: [["created_at", "desc"]],
  });

  const mediaCount = await MediaModel.count({
    where: findObject,
  });

  return { data: mediaList, total: mediaCount };
};

const bulkCreate = async (mediaSources: {}[]) => {
  try {
    return MediaModel.bulkCreate(mediaSources);
  } catch (error) {
    throw error;
  }
};

const scrapeMedia = async (
  url: string,
  user_id: string
): Promise<CreateMediaDto[]> => {
  // Launch Puppeteer
  const browser = await puppeteer.launch({
    //Disable security of Chrome protecting device
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    // Set longer timeout and enable JavaScript
    await page.setJavaScriptEnabled(true);

    await page.goto(url, {
      waitUntil: "load",
      timeout: 30000,
    });

    // Navigate to the provided URL
    await page.goto(url, {
      waitUntil: "load",
      timeout: 30000,
    });

    // Wait for content to load
    await page.waitForFunction(() => {
      return document.readyState === "complete";
    });

    // Scroll to bottom to trigger lazy-loaded content
    await autoScroll(page);
    const imageType = MediaEnum.IMAGE;
    const videoType = MediaEnum.VIDEO;

    // Scrape images and videos
    const media = await page.evaluate(
      (url, user_id, imageType, videoType) => {
        //remove duplicate media src
        let mediaSources: CreateMediaDto[] = [];

        const images = document.querySelectorAll("img");
        images.forEach((img: any) => {
          if (img.src && !img.src.includes(".svg")) {
            mediaSources.push({
              user_id,
              domain: url,
              type: imageType,
              url: img.src,
              metadata: { srcset: img.srcset },
            });
          }
        });

        const videos = document.querySelectorAll("video");
        videos.forEach((video: any) => {
          if (video.src) {
            mediaSources.push({
              user_id,
              domain: url,
              type: videoType,
              url: video.src.includes("http")
                ? video.src
                : `${url}/${video.src}`,
            });
          }
          const sources = video.querySelectorAll("source");
          sources.forEach((source: any) => {
            if (source.src) {
              mediaSources.push({
                user_id,
                domain: url,
                type: videoType,
                url: video.src.includes("http")
                  ? video.src
                  : `${url}/${video.src}`,
              });
            }
          });
        });

        return mediaSources;
      },
      url,
      user_id,
      imageType,
      videoType
    );

    // Close the browser
    return media;
  } catch (error) {
    throw error;
  } finally {
    await browser.close();
  }
};

// Helper function to scroll page and reveal lazy-loaded content
const autoScroll = async (page: Page) => {
  return page.evaluate(() => {
    return new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      let scrolls = 0;

      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        scrolls++;

        // Stop scrolling if the bottom is reached or maxScrolls is hit
        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
};

const getMediaSources = (
  mediaSources: Record<string, string>,
  url: string,
  user_id: string
) => {
  const data: any = [];
  Object.entries(mediaSources).forEach(([src, type]) => {
    data.push({
      user_id,
      domain: url,
      type: type,
      url: src,
    });
  });

  return data;
};

const MediaService = { bulkCreate, getMediaList, scrapeMedia, getMediaSources };
export default MediaService;
