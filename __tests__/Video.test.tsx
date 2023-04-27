import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Video from "../components/Video";

describe("Video component", () => {
  test("video should play on clicking play button", () => {
    const videoRef = React.createRef<HTMLVideoElement>();
    const handleIsPlaying = jest.fn();
    const isMotion = false;
    const isAudio = false;
    const url = "sample-video.mp4";
    render(
      <Video
        videoRef={videoRef}
        handleIsPlaying={handleIsPlaying}
        isMotion={isMotion}
        isAudio={isAudio}
        url={url}
      />
    );

    const videoElement = document.querySelector("video");
    fireEvent.play(videoElement);

    expect(handleIsPlaying).toHaveBeenCalledWith(true);

    fireEvent.pause(videoElement);

    expect(handleIsPlaying).toHaveBeenCalledWith(false);
  });

  test("video should have correct source URL and dimensions", () => {
    const videoRef = React.createRef<HTMLVideoElement>();
    const handleIsPlaying = jest.fn();
    const isMotion = false;
    const isAudio = false;
    const url = "sample-video.mp4";
    const { getByTestId } = render(
      <Video
        videoRef={videoRef}
        handleIsPlaying={handleIsPlaying}
        isMotion={isMotion}
        isAudio={isAudio}
        url={url}
      />
    );

    const videoElement = getByTestId("video-element") as HTMLVideoElement;
    const sourceElement = videoElement.querySelector(
      "source"
    ) as HTMLSourceElement;

    expect(sourceElement.src).toBe(url);
    expect(videoElement.offsetWidth).toBe(553);
    expect(videoElement.offsetHeight).toBe(315);
  });

  test("video should have correct border color based on isMotion and isAudio props", () => {
    const videoRef = React.createRef<HTMLVideoElement>();
    const handleIsPlaying = jest.fn();
    const isMotion = true;
    const isAudio = true;
    const url = "sample-video.mp4";
    const { getByTestId } = render(
      <Video
        videoRef={videoRef}
        handleIsPlaying={handleIsPlaying}
        isMotion={isMotion}
        isAudio={isAudio}
        url={url}
      />
    );

    const videoElement = getByTestId("video-element") as HTMLVideoElement;

    expect(videoElement.style.border).toBe("5px solid #ff0059");
  });
});
