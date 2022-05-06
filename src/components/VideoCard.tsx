import { Box, Chip } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

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

  const handleShowVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`);
  };

  return (
    <Card
      className={classes.root}
      onClick={() => {
        handleShowVideo(videoDetail.videoId);
      }}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={videoDetail.thumbnail.thumbnails[3].url}
          title={videoDetail.title.runs[0].text}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {videoDetail.title.runs[0].text}
          </Typography>
          {videoDetail.thumbnailOverlays[0].thumbnailOverlayTimeStatusRenderer
            .style === "LIVE" && (
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
    </Card>
  );
}
