import { fetchYoutubeChannelById } from "../utils/api";

chrome.runtime.onInstalled.addListener(() => {
  checkLive();

  chrome.alarms.create({
    periodInMinutes: 1,
  });
});

chrome.alarms.onAlarm.addListener(() => {
  checkLive();
});

const checkLive = () => {
  fetchYoutubeChannelById().then((videoList) => {
    let isLive = false;
    if (videoList.items.length === 0) {
      isLive = false;
    }

    if (videoList.items[0].snippet.liveBroadcastContent === "live") {
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
  });
};
