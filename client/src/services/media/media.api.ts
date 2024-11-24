import Api from "../api";
import { IMediaList, MediaEnum } from "./media.type";

const scrapeMediaFromUrls = async (urlList: string[]) => {
  const token = localStorage.getItem("token");

  try {
    const res: { success_domains: string[]; error_domains: string[] } =
      await Api({
        url: "/api/medias/scrape-urls",
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        data: { url: urlList },
      });
    return res;
  } catch (error) {
    throw error;
  }
};

const getMediaList = async (params: {
  page: number;
  limit: number;
  type?: MediaEnum;
  searchKey?: string;
}) => {
  const token = localStorage.getItem("token");
  try {
    const res: IMediaList = await Api({
      url: "/api/medias",
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

const MediaApi = {
  scrapeMediaFromUrls,
  getMediaList,
};
export default MediaApi;
