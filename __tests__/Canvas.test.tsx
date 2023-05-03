import React, { useRef } from "react";
import { render } from "@testing-library/react";
import Canvas from "../components/Video/Canvas";

// mock AudioContext
jest.mock("node:globalThis", () => {
  const AudioContext = {
    resume: jest.fn(),
    createMediaElementSource: jest.fn(),
    createAnalyser: jest.fn(() => ({
      fftSize: 512,
      minDecibels: -90,
      maxDecibels: -10,
      smoothingTimeConstant: 0.85,
      frequencyBinCount: 512,
      getByteFrequencyData: jest.fn(() => new Uint8Array(512)),
    })),
    destination: jest.fn(),
  };
  return {
    ...global.window,
    AudioContext,
  };
});

const mockAudioContext = jest.fn().mockImplementation(() => {
  return {
    resume: jest.fn(),
    createMediaElementSource: jest.fn(),
    createAnalyser: jest.fn(() => ({
      fftSize: 512,
      minDecibels: -90,
      maxDecibels: -10,
      smoothingTimeConstant: 0.85,
      frequencyBinCount: 512,
      getByteFrequencyData: jest.fn(() => new Uint8Array(512)),
    })),
    destination: jest.fn(),
  };
});

jest.mock("node:globalThis", () => ({
  ...global.window,
  AudioContext: mockAudioContext,
}));


xtest('renders canvas', () => {
  const videoRef = { current: document.createElement('video') };
  const setIsMotion = jest.fn();
  const setIsAudio = jest.fn();
  const setIsTripped = jest.fn();
  const isPlaying = true;
  const { getByRole } = render(
    <Canvas
      videoRef={videoRef}
      setIsMotion={setIsMotion}
      setIsAudio={setIsAudio}
      setIsTripped={setIsTripped}
      isPlaying={isPlaying}
    />
  );
  const canvasElement = getByRole('img');
  expect(canvasElement).toBeInTheDocument();
});