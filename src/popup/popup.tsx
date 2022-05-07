import { Box, CircularProgress, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import VideoCard from "../components/VideoCard";
import {
  checkLiveYoutubeChannel,
  crawlYoutubeChannel,
  VideoDetail,
  VideoInformation,
} from "../utils/api";
import "./popup.css";

const App: React.FC<{}> = () => {
  const [videoListCrawl, setVideoListCrawl] = useState<VideoInformation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const [videoLive, setVideoLive] = useState<VideoDetail>(null);
  const [isLiving, setIsLiving] = useState<boolean>(false);

  useEffect(() => {
    Promise.all([checkLiveYoutubeChannel(), crawlYoutubeChannel()])
      .then((result) => {
        if (result[0]) {
          setIsLiving(true);
          setVideoLive(result[0]);
        }

        setVideoListCrawl(result[1].slice(0, 10));
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  if (loading && !Boolean(error))
    return (
      <Box style={{ display: "flex", alignItems: "center" }}>
        <CircularProgress size={20} />
        <Typography style={{ marginLeft: "10px" }} variant="h5">
          Loading...
        </Typography>
      </Box>
    );

  if (Boolean(error)) {
    return (
      <Box>
        <Typography style={{ marginLeft: "10px" }} variant="h5">
          {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box pb={1}>
      {isLiving && (
        <Box mb={1}>
          <Typography variant="h5">Video Live Stream</Typography>
          <VideoCard videoDetail={videoLive} />
        </Box>
      )}

      <Typography variant="h5">Danh sách video</Typography>
      {videoListCrawl.map((video: VideoInformation) => {
        return (
          <Box mb={1} key={video.gridVideoRenderer.videoId}>
            <VideoCard videoDetail={video.gridVideoRenderer} />
          </Box>
        );
      })}
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);

ReactDOM.render(<App />, root);
