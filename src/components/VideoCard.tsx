import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { VideoInformation } from "../utils/api";
import { Box, Chip } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 170,
  },
});

export default function VideoCard({
  videoDetail,
}: {
  videoDetail: VideoInformation;
}) {
  const classes = useStyles();

  const handleShowVideo = (videoUrl: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoUrl}`);
  };

  return (
    <Card
      className={classes.root}
      onClick={() => {
        handleShowVideo(videoDetail.id.videoId);
      }}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={videoDetail.snippet.thumbnails.high.url}
          title={videoDetail.snippet.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {videoDetail.snippet.title}
          </Typography>
          {videoDetail.snippet.liveBroadcastContent === "none" && (
            <Box my={1}>
              <Chip label="Live" color="secondary" />
            </Box>
          )}
          <Typography variant="body2" color="textSecondary" component="p">
            {new Date(videoDetail.snippet.publishTime).toLocaleString()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
