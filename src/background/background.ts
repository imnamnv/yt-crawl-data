import { crawlYoutubeChannel } from "../utils/api";

chrome.runtime.onInstalled.addListener(() => {
  checkLive();

  chrome.alarms.create({
    periodInMinutes: 1 / 2,
  });
});

chrome.alarms.onAlarm.addListener(() => {
  checkLive();
});

const checkLive = () => {
  crawlYoutubeChannel()
    .then((videoList) => {
      let isLive = false;

      if (videoList.length === 0) {
        isLive = false;
      } else {
        for (let index = 0; index < 5; index++) {
          for (const liveStatus of videoList[index].gridVideoRenderer
            ?.thumbnailOverlays) {
            if (
              liveStatus?.thumbnailOverlayTimeStatusRenderer?.style === "LIVE"
            ) {
              isLive = true;
            }
          }
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
