import { Box, Button, CardActions, Chip } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { setStoredVideoLink } from "../utils/storage";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 170,
  },
});

export default function VideoCard({ videoDetail }: { videoDetail: any }) {
  const classes = useStyles();

  const handleShowNewTab = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`);
  };

  const handleShowVideo = (videoId: string) => {
    setStoredVideoLink(`https://www.youtube.com/embed/${videoId}`);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={() => {
          handleShowNewTab(videoDetail.videoId);
        }}
      >
        <CardMedia
          className={classes.media}
          image={videoDetail.thumbnail.thumbnails[3].url}
          title={videoDetail.title.runs[0].text}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {videoDetail.title.runs[0].text}
          </Typography>
          {videoDetail.viewCountText.runs && (
            <Box my={1}>
              <Chip label="Live" color="secondary" />
            </Box>
          )}
          <Typography variant="body2" color="textSecondary" component="p">
            {videoDetail.viewCountText.simpleText
              ? videoDetail.viewCountText.simpleText
              : `${videoDetail.viewCountText.runs[0].text} ${videoDetail.viewCountText.runs[1].text}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {videoDetail.publishedTimeText?.simpleText}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing={true}>
        <Button
          style={{ textTransform: "none" }}
          onClick={() => {
            handleShowVideo(videoDetail.videoId);
          }}
          size="small"
          color="primary"
        >
          Mở cửa sổ nhỏ trên Facebook
        </Button>
        <Button
          style={{ textTransform: "none" }}
          onClick={() => {
            handleShowNewTab(videoDetail.videoId);
          }}
          size="small"
          color="primary"
        >
          Mở tab mới bằng Youtube
        </Button>
      </CardActions>
    </Card>
  );
}
