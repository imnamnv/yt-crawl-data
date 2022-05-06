import { Box, CircularProgress, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import VideoCard from "../components/VideoCard";
import { crawlYoutubeChannel, VideoInformation } from "../utils/api";
import "./popup.css";

const App: React.FC<{}> = () => {
  const [videoListCrawl, setVideoListCrawl] = useState<VideoInformation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    crawlYoutubeChannel().then((data) => {
      console.log("data", data);
      setVideoListCrawl(data.slice(0, 11));
      setLoading(false);
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
