/**
 * @description: function that creates a new audio context
 */
const createAudioAnalyserCtx = (
  video: HTMLVideoElement,
  audioElementRef: React.MutableRefObject<HTMLAudioElement>,
  audioContextRef: React.MutableRefObject<AudioContext>,
  audioAnalyserNodeRef: React.MutableRefObject<AnalyserNode>
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
    audioAnalyserNodeRef.current = audioContextRef.current.createAnalyser();
    audioAnalyserNodeRef.current.fftSize = 512;
    audioAnalyserNodeRef.current.minDecibels = -90;
    audioAnalyserNodeRef.current.maxDecibels = -10;
    audioAnalyserNodeRef.current.smoothingTimeConstant = 0.85;

    source.connect(audioAnalyserNodeRef.current);
    audioAnalyserNodeRef.current.connect(audioContextRef.current.destination);
  }
};

/**
 * @description: function that finds average audio decibel level and and sets alert according to threshold
 */
const analyzeAudio = (
  audioContextRef: React.MutableRefObject<AudioContext | null>,
  audioAnalyserNodeRef: React.MutableRefObject<AnalyserNode>
) => {
  audioContextRef.current.resume();

  const bufferLength = audioAnalyserNodeRef.current.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  audioAnalyserNodeRef.current.getByteFrequencyData(dataArray);
  const average =
    dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
  return average;
};

export { createAudioAnalyserCtx, analyzeAudio };
