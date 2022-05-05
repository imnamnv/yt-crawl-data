const API_KEY = "AIzaSyCqf2k5IIGA7Zs3rFeTliznHIvyrkEx63M";
const CHANNEL_ID = "UC496j3y9SD5rfeVfwFbbsJg";
export interface VideoInformation {
  id: {
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: "live" | "none";
    publishTime: string;
  };
}
export interface VideoListData {
  items: VideoInformation[];
}

export async function fetchYoutubeChannelById() {
  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&order=date&key=${API_KEY}&maxResults=10`;
  const res = await fetch(url);

  if (!res.ok) throw new Error("Can not get video of this channel");

  const data: VideoListData = await res.json();
  return data;
}
