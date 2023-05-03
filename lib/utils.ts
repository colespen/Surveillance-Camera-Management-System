/**
 * @description: function that creates a new audio context
 */
const createAudioAnalyserCtx = (
  video: HTMLVideoElement,
  audioElementRef: React.MutableRefObject<HTMLAudioElement>,
  audioContextRef: React.MutableRefObject<AudioContext>,
  analyserNodeRef: React.MutableRefObject<AnalyserNode>
) => {
  if (!audioContextRef.current) {
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    audioContextRef.current = new AudioContext();

    // Create a separate audio element for audio analysis
    audioElementRef.current = new Audio();
    audioElementRef.current.crossOrigin = "anonymous";
    audioElementRef.current = video;

    const source = audioContextRef.current.createMediaElementSource(
      audioElementRef.current
    );
    analyserNodeRef.current = audioContextRef.current.createAnalyser();
    analyserNodeRef.current.fftSize = 512;
    analyserNodeRef.current.minDecibels = -90;
    analyserNodeRef.current.maxDecibels = -10;
    analyserNodeRef.current.smoothingTimeConstant = 0.85;

    source.connect(analyserNodeRef.current);
    analyserNodeRef.current.connect(audioContextRef.current.destination);
  }
};

/**
 * @description: function that finds average audio decibel level and and sets alert according to threshold
 */
const analyzeAudio = (
  isPlaying: boolean,
  audioContextRef: React.MutableRefObject<AudioContext | null>,
  analyserNodeRef: React.MutableRefObject<AnalyserNode>,
  isAudioSetRef: React.MutableRefObject<boolean>,
  setIsAudio: (bool: boolean) => void,
  setIsTripped: (bool: boolean) => void
) => {
  // if (!isPlaying) {
  //   return () => clearTimeout(analyzeDelay);
  // }
  audioContextRef.current.resume();

  const bufferLength = analyserNodeRef.current.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  analyserNodeRef.current.getByteFrequencyData(dataArray);
  const average =
    dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;

  // Set audio flag based on the decibel value
  if (average > 9) {
    // do not set to true repeatedly if already true
    if (!isAudioSetRef.current) {
      setIsAudio(true);
      setIsTripped(true);
      isAudioSetRef.current = true;
    }
  } else {
    if (isAudioSetRef.current) {
      setIsAudio(false);
      isAudioSetRef.current = false;
    }
  }
  // Check audio flag every 100ms
  // const analyzeDelay = setTimeout(analyzeAudio, 200);
  // return () => clearTimeout(analyzeDelay);
};

/**
 * @description: function that compares two frames and return number of different pixels between each
 */
const analysePixelDiff = (
  currentFrame: ImageData,
  previousFrame: ImageData,
  threshold: number,
  diffPixelsCount: number
) => {
  for (let i = 0; i < currentFrame.data.length; i += 8) {
    const r1 = previousFrame.data[i];
    const g1 = previousFrame.data[i + 1];
    const b1 = previousFrame.data[i + 2];

    const r2 = currentFrame.data[i];
    const g2 = currentFrame.data[i + 1];
    const b2 = currentFrame.data[i + 2];
    const pixelSum = Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2);

    if (pixelSum > threshold) {
      diffPixelsCount++;
      currentFrame.data[i] = 0;
      currentFrame.data[i + 1] = 255;
      currentFrame.data[i + 2] = 0;
    }
  }
  return diffPixelsCount;
};

export { analysePixelDiff, createAudioAnalyserCtx, analyzeAudio };
