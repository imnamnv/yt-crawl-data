import React from "react";

type Props = {
  videoLink: string;
};
export default ({ videoLink }: Props) => {
  return (
    <iframe
      width="420"
      height="315"
      src={`${videoLink}?autoplay=1`}
      allow="autoplay; encrypted-media"
      allowFullScreen
    ></iframe>
  );
};
