import { Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import VideoIframeCard from "../components/VideoIframeCard";
import { getStoredVideoLink, setStoredVideoLink } from "../utils/storage";
import "./contentScript.css";

const App = () => {
  const [videoLink, setVideoLink] = useState<string>("");
  const [isPopup, setIsPopup] = useState<boolean>(false);

  useEffect(() => {
    getStoredVideoLink().then((videoLink) => {
      setVideoLink(videoLink);
      setIsPopup(true);
    });

    chrome.storage.onChanged.addListener(function (changes) {
      setIsPopup((state) => !state);
    });

    return () => {
      chrome.storage.onChanged.removeListener(() => {
        return;
      });
    };
  }, [isPopup]);

  if (!videoLink || !isPopup) return null;

  const handleCloseIframe = () => {
    setStoredVideoLink("");
    setVideoLink("");
  };

  return (
    <div className="overlayCard">
      <Button onClick={handleCloseIframe} variant="contained" color="secondary">
        <CloseIcon />
      </Button>

      <VideoIframeCard videoLink={videoLink} />
    </div>
  );
};

const root = document.createElement("div");

document.body.appendChild(root);
ReactDOM.render(<App />, root);
