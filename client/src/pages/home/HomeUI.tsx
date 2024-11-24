import { Button, Input, List, Modal, Pagination, Select, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import MediaItem from "../../components/MediaItem/MediaItem";
import { IMediaList, MediaEnum } from "../../services/media/media.type";
import styles from "./Home.module.scss";

interface HomeUIProps {
  loading: boolean;
  urlString: string;
  medias: IMediaList;
  openModal: boolean;
  onChangePagination: (page: number, limit: number) => void;
  onSetUrlString: (e: string) => void;
  onSetOpenModal: (e: boolean) => void;
  onScrape: () => void;
  onChangeType: (e: MediaEnum) => void;
  onSetSearchKey: (e: string) => void;
}

const mediaTypeOptions = [
  { label: "All", value: null },
  { label: <Tag color="#87d068">Image</Tag>, value: MediaEnum.IMAGE },
  { label: <Tag color="#f50">Video</Tag>, value: MediaEnum.VIDEO },
];

const HomeUI = (props: HomeUIProps) => {
  const {
    urlString,
    loading,
    medias,
    openModal,
    onSetUrlString,
    onChangePagination,
    onSetOpenModal,
    onScrape,
    onChangeType,
    onSetSearchKey,
  } = props;
  return (
    <div>
      <div className={styles.home}>
        <div className={styles.header}>
          <h1>Media Scrapper</h1>
          <div className={styles.action}>
            <Select
              placeholder="Media type"
              defaultValue={null}
              options={mediaTypeOptions}
              className={styles.type_select}
              onChange={(e) => onChangeType(e)}
            />
            <Input
              placeholder="Search"
              className={styles.search_input}
              onChange={(e) => onSetSearchKey(e.target.value)}
            />
            <Button
              type="primary"
              icon="+"
              onClick={() => onSetOpenModal(true)}
            >
              Add domain
            </Button>
          </div>
        </div>
        <List
          loading={loading}
          className={styles.list}
          itemLayout="vertical"
          size="large"
          dataSource={medias.data}
          renderItem={(item) => <MediaItem data={item} key={item.id} />}
        />
        <Pagination
          hideOnSinglePage
          current={medias.page}
          pageSize={medias.limit}
          className={styles.pagination}
          total={medias.total}
          onChange={(page, limit) => onChangePagination(page, limit)}
        />
      </div>
      <Modal
        open={openModal}
        title="Scrap media"
        footer={null}
        onCancel={() => onSetOpenModal(false)}
      >
        <TextArea
          onChange={(e) => onSetUrlString(e.target.value)}
          value={urlString}
        />
        <p>
          You can provide multi domains for each scrapping session, domains are
          separated by semi-colon (","), e.g: https://kenh14.vn,
          https://vietnamnet.vn
        </p>
        <div className={styles.modal_footer}>
          <Button onClick={() => onSetOpenModal(false)}>Cancel</Button>
          <Button type="primary" onClick={onScrape} disabled={loading}>
            {loading ? "Scrapping..." : "Scrap"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};
export default HomeUI;
