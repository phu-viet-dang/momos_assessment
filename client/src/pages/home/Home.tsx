import { message, notification } from "antd";
import lodash from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import MediaApi from "../../services/media/media.api";
import { IMediaList, MediaEnum } from "../../services/media/media.type";
import HomeUI from "./HomeUI";

const Context = React.createContext({ name: <div /> });

const Home = () => {
  const [medias, setMedias] = useState<IMediaList>({
    data: [],
    page: 1,
    total: 0,
    limit: 10,
  });

  const [loading, setLoading] = useState<boolean>();
  const [urlString, setUrlString] = useState<string>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [type, setType] = useState<MediaEnum>();
  const [debounceSearchKey, setDebounceSearchKey] = useState<string>();

  const [api, contextHolder] = notification.useNotification();
  const contextValue = useMemo(() => ({ name: <div /> }), []);

  const onSetDebounceSearchKey = lodash.debounce((e: string) => {
    setDebounceSearchKey(e);
    setMedias({ ...medias, page: 1 });
  }, 1000);

  useEffect(() => {
    getMediaList();
  }, [medias.page, medias.limit, type, debounceSearchKey]);

  const getMediaList = async () => {
    try {
      const res = await MediaApi.getMediaList({
        page: medias.page,
        limit: medias.limit,
        type,
        searchKey: debounceSearchKey || undefined,
      });
      setMedias({ ...medias, ...res });
    } catch (error) {
      message.error(error.message);
    }
  };

  const openSuccessNotification = (success_domains: string[] = []) => {
    api.success({
      message: `Success Scrapping!`,
      duration: null,
      description: (
        <Context.Consumer>
          {() =>
            `Successfully scraped medias from ${
              success_domains.length
            } domain(s): ${success_domains.map((item) => item).join(`, `)}`
          }
        </Context.Consumer>
      ),
      placement: "topRight",
    });
  };

  const openErrorNotification = (error_domains: string[] = []) => {
    api.error({
      message: `Error Scrapping!`,
      duration: null,
      description: (
        <Context.Consumer>
          {() =>
            `Scrape failed from ${
              error_domains.length
            } domain(s): ${error_domains.map((item) => item).join(`, `)}`
          }
        </Context.Consumer>
      ),
      placement: "topRight",
    });
  };

  const handleScrape = async () => {
    if (!urlString) {
      return message.warning("Url is required!");
    }

    setLoading(true);
    const urlList = urlString.split(",").map((item) => item.trim());

    try {
      const res = await MediaApi.scrapeMediaFromUrls(urlList);
      openSuccessNotification(res.success_domains);
      openErrorNotification(res.error_domains);
      setOpenModal(false);
      setUrlString("");

      if (medias.page == 1) {
        getMediaList();
      } else {
        setMedias({ ...medias, page: 1 });
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Context.Provider value={contextValue}>
      <HomeUI
        loading={loading}
        urlString={urlString}
        medias={medias}
        openModal={openModal}
        onChangePagination={(page, limit) =>
          setMedias({ ...medias, page, limit })
        }
        onSetUrlString={(e) => setUrlString(e)}
        onSetOpenModal={(e) => setOpenModal(e)}
        onScrape={handleScrape}
        onChangeType={(e) => setType(e)}
        onSetSearchKey={(e) => {
          onSetDebounceSearchKey(e);
        }}
      />
      {contextHolder}
    </Context.Provider>
  );
};
export default Home;
