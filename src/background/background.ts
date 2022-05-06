import { crawlYoutubeChannel } from "../utils/api";

chrome.runtime.onInstalled.addListener(() => {
  console.log("videoList");
  checkLive();

  chrome.alarms.create({
    periodInMinutes: 1 / 6,
  });
});

chrome.alarms.onAlarm.addListener(() => {
  console.log("videoList");

  // checkLive();
});

const checkLive = () => {
  crawlYoutubeChannel()
    .then((videoList) => {
      let isLive = false;

      if (videoList.length === 0) {
        isLive = false;
      } else {
        for (const video of videoList) {
          if (
            video.gridVideoRenderer.thumbnailOverlays[0]
              .thumbnailOverlayTimeStatusRenderer === "LIVE"
          )
            isLive = true;
        }
      }

      chrome.action.setBadgeText({
        text: isLive === true ? "Live" : "Off",
      });

      if (isLive) {
        chrome.action.setBadgeBackgroundColor({ color: "red" });
      } else {
        chrome.action.setBadgeBackgroundColor({ color: "gray" });
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};
