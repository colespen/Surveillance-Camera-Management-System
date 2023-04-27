import { fireEvent, render, screen } from "@testing-library/react";
import { CanvasProps } from "../datatypes/proptypes";
import Canvas from "../components/Canvas";

describe("Canvas", () => {
  const videoRef = {
    current: document.createElement("video"),
  };

  const setIsMotion = jest.fn();
  const setIsAudio = jest.fn();
  const setIsTripped = jest.fn();

  const defaultProps: CanvasProps = {
    videoRef,
    setIsMotion,
    setIsAudio,
    setIsTripped,
    isPlaying: true,
    isOffline: false,
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders canvas element with the correct dimensions", () => {
    render(<Canvas {...defaultProps} />);

    const canvas = screen.getByRole("canvas");

    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute("width", "543");
    expect(canvas).toHaveAttribute("height", "305");
  });

  it("calls setIsMotion and setIsTripped when motion is detected", async () => {
    const canvas = render(<Canvas {...defaultProps} />).container.querySelector(
      "canvas"
    ) as HTMLCanvasElement;

    const mockImage = new ImageData(new Uint8ClampedArray(1920 * 1080 * 4), 1920, 1080);
    const ctx = canvas.getContext("2d");
    ctx!.putImageData(mockImage, 0, 0);

    fireEvent(canvas, new MouseEvent("mousemove"));

    expect(setIsMotion).toHaveBeenCalledWith(true);
    expect(setIsTripped).toHaveBeenCalledWith(true);
  });

  it("calls setIsAudio and setIsTripped when audio is detected", async () => {
    const canvas = render(<Canvas {...defaultProps} />).container.querySelector(
      "canvas"
    ) as HTMLCanvasElement;

    const mockDataArray = new Uint8Array(256);
    const mockAnalyserNode = {
      getByteFrequencyData: jest.fn().mockReturnValue(mockDataArray),
    };
    const mockAudioContext = {
      createAnalyser: jest.fn().mockReturnValue(mockAnalyserNode),
    };
    const mockAudioElement = {
      crossOrigin: "",
    };

    videoRef.current = document.createElement("video");
    videoRef.current.pause = jest.fn();
    videoRef.current.play = jest.fn().mockResolvedValue(true);
    (global as any).AudioContext = jest.fn().mockReturnValue(mockAudioContext);
    (global as any).Audio = jest.fn().mockReturnValue(mockAudioElement);

    await fireEvent(canvas, new MouseEvent("mousemove"));

    expect(setIsAudio).toHaveBeenCalledWith(true);
    expect(setIsTripped).toHaveBeenCalledWith(true);
  });
});
