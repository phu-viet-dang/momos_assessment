import { Flex, List, message, Popover, Tag, Tooltip } from "antd";
import { Fragment } from "react/jsx-runtime";
import { IMedia } from "../../services/media/media.type";
import styles from "./MediaItem.module.scss";

interface MediaItemProps {
  data: IMedia;
}

const MediaItem = (props: MediaItemProps) => {
  const { data } = props;

  const copyToClipBoard = (value?: string) => {
    if (value) {
      navigator.clipboard.writeText(value);
      message.success("Copied to clipboard!");
    }
  };

  const CopyIcon = (props: { value: string }) => {
    return (
      <Tooltip title="Copy">
        <img
          style={{ cursor: "pointer", marginTop: "0.3rem", opacity: 0.7 }}
          width={16}
          height={16}
          src="/popout.png"
          onClick={() => copyToClipBoard(props.value)}
        />
      </Tooltip>
    );
  };

  return (
    <List.Item>
      <div className={styles.media}>
        <div className={styles.content}>
          <Flex gap={10} align="start">
            <div className={styles.domain}>{data.domain}</div>
            <CopyIcon value={data.domain} />
          </Flex>
          <Tag color={data.type == "video" ? "#f50" : "#87d068"}>
            {data.type}
          </Tag>
          <Flex gap={10} align="center">
            <div>
              <strong>Media src</strong>
              <Flex gap={10} align="start">
                <div className={styles.url}>{data.url}</div>
                <CopyIcon value={data.url} />
              </Flex>
              {data?.metadata?.srcset && (
                <Fragment>
                  <strong>Media setsrc</strong>
                  <Flex gap={10} align="start">
                    <div className={styles.srcset}>
                      {data?.metadata?.srcset}
                    </div>
                    <CopyIcon value={data?.metadata?.srcset} />
                  </Flex>
                </Fragment>
              )}
            </div>
          </Flex>
        </div>
        <div className={styles.asset}>
          {data.type === "image" ? (
            <img
              width={272}
              alt="logo"
              src={data.url}
              srcSet={data?.metadata?.srcset}
            />
          ) : (
            <video src={data.url} playsInline autoPlay muted loop />
          )}
        </div>
      </div>
    </List.Item>
  );
};

export default MediaItem;
