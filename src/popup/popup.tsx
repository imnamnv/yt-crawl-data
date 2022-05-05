import { Box, CircularProgress, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import VideoCard from "../components/VideoCard";
import {
  fetchYoutubeChannelById,
  VideoInformation,
  VideoListData,
} from "../utils/api";
import "./popup.css";

const App: React.FC<{}> = () => {
  const [videoList, setVideoList] = useState<VideoListData>({ items: [] });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchYoutubeChannelById()
      .then((data) => {
        setVideoList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  if (loading)
    return (
      <Box style={{ display: "flex", alignItems: "center" }}>
        <CircularProgress size={20} />
        <Typography style={{ marginLeft: "10px" }} variant="h5">
          Loading...
        </Typography>
      </Box>
    );

  return (
    <>
      {videoList.items.map((video: VideoInformation) => {
        return (
          <Box my={2} key={video.id.videoId}>
            <VideoCard videoDetail={video} />
          </Box>
        );
      })}
    </>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);

ReactDOM.render(<App />, root);
