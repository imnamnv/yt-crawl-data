import { checkLiveYoutubeChannel } from "../utils/api";

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
  checkLiveYoutubeChannel()
    .then((videoDetail) => {
      let isLive = false;

      if (!videoDetail) {
        isLive = false;
      } else {
        isLive = true;
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
