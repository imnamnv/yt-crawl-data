import request from "request-promise";
import cheerio from "cheerio"; // khai báo module cheerio
export interface VideoInformation {
  gridVideoRenderer: VideoDetail;
}

export interface VideoDetail {
  thumbnail: {
    thumbnails: { height: number; url: string; width: 168 }[];
  };
  thumbnailOverlays: {
    thumbnailOverlayTimeStatusRenderer?: {
      icon?: {
        icontype: any;
      };
      style?: "LIVE" | "DEFAULT";
    };
  }[];
  videoId: string;
  viewCountText: {
    runs?: { text: string }[];
    simpleText?: string;
  };
  publishedTimeText?: {
    simpleText?: string;
  };
}
export interface VideoListData {
  items: VideoInformation[];
}

export async function crawlYoutubeChannel() {
  let data: VideoInformation[] = [];
  var options = {
    uri: "https://www.youtube.com/c/MixiGamingofficial/videos",
    transform: function (body) {
      return cheerio.load(body);
    },
  };

  await request(options)
    .then(function ($) {
      let scripts = $("script");
      for (let i = scripts.length - 1; i >= 0; i--) {
        if (
          scripts[i].children.length > 0 &&
          scripts[i].children[0].data.indexOf("var ytInitialData") !== -1
        ) {
          const result = JSON.parse(
            scripts[i].children[0].data
              .replace("var ytInitialData =", "")
              .replace(";", "")
              .trim()
          );

          data =
            result.contents.twoColumnBrowseResultsRenderer.tabs[1].tabRenderer
              .content.sectionListRenderer.contents[0].itemSectionRenderer
              .contents[0].gridRenderer.items;
          break;
        }
      }
    })
    .catch(function (err) {
      console.log("err", err);
    });
  return data;
}

export async function checkLiveYoutubeChannel() {
  let data: VideoDetail = {
    thumbnail: {
      thumbnails: [],
    },
    thumbnailOverlays: [],
    videoId: "",
    viewCountText: {
      runs: [],
      simpleText: "",
    },
  };
  var options = {
    uri: "https://www.youtube.com/c/MixiGamingofficial",
    transform: function (body) {
      return cheerio.load(body);
    },
  };

  await request(options)
    .then(function ($) {
      let scripts = $("script");
      for (let i = scripts.length - 1; i >= 0; i--) {
        if (
          scripts[i].children.length > 0 &&
          scripts[i].children[0].data.indexOf("var ytInitialData") !== -1
        ) {
          const result = JSON.parse(
            scripts[i].children[0].data
              .replace("var ytInitialData =", "")
              .replace(";", "")
              .trim()
          );

          data =
            result.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer
              .content.sectionListRenderer.contents[0].itemSectionRenderer
              .contents[0].channelFeaturedContentRenderer?.items[0]
              .videoRenderer;

          break;
        }
      }
    })
    .catch(function (err) {
      console.log("err", err);
    });

  if (data?.viewCountText.runs) return data;
  return null;
}
