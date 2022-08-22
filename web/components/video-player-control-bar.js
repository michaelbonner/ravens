import classNames from "classnames";
import {
  GrContract,
  GrExpand,
  GrPause,
  GrPlay,
  GrVolume,
  GrVolumeMute,
} from "react-icons/gr";

export const VideoPlayerControlBar = ({
  isFullscreen,
  player,
  muted,
  setMuted,
  setVolume,
  scrubber,
  scrubberWidth,
  scrubberPosition,
  setScrubberPosition,
  setHasClicked,
  toggleFullScreen,
  isPlaying,
  setIsPlaying,
}) => {
  return (
    <div className="hidden lg:flex space-x-8 relative z-10 container mx-auto bg-black">
      <button
        className="relative text-4xl w-8 h-8"
        onClick={() => {
          setHasClicked(true);
          setIsPlaying(!isPlaying);
        }}
        title="Play/Pause"
      >
        {isPlaying ? (
          <GrPause
            className={classNames(
              `bpd-white-icon`,
              `absolute inset-0 transition-all duration-500 fill-current`
            )}
          />
        ) : (
          <GrPlay
            className={classNames(
              `bpd-white-icon`,
              `absolute inset-0 transition-all duration-500 fill-current`
            )}
          />
        )}
      </button>
      <button
        className="relative w-full border-2 border-gray-300 rounded"
        onClick={(e) => {
          setHasClicked(true);
          const scrubberBoundingClientRect =
            scrubber.current.getBoundingClientRect();

          const zeroBasedClickPosition =
            e.clientX - scrubberBoundingClientRect.left;

          const xPercentageClicked =
            zeroBasedClickPosition / scrubber.current.clientWidth;

          player.current.seekTo(xPercentageClicked, "fraction");
          setScrubberPosition(xPercentageClicked * scrubberWidth);
        }}
        ref={scrubber}
      >
        <div
          className="h-full w-1 bg-gray-500 absolute top-0"
          style={{
            transform: `translate3d(${scrubberPosition}px,0, 0)`,
          }}
        ></div>
      </button>
      <div className="text-2xl flex items-center space-x-6">
        {muted === true ? (
          <button
            className="bpd-white-icon"
            onClick={() => {
              setHasClicked(true);
              setMuted(false);
              setVolume(0.5);
            }}
          >
            <GrVolumeMute />
          </button>
        ) : (
          <button
            className="bpd-white-icon"
            onClick={() => {
              setHasClicked(true);
              setMuted(true);
              setVolume(0);
            }}
          >
            <GrVolume />
          </button>
        )}
        {isFullscreen ? (
          <button
            className="bpd-white-icon"
            onClick={() => {
              setHasClicked(true);
              toggleFullScreen(false);
            }}
          >
            <GrContract />
          </button>
        ) : (
          <button
            className="bpd-white-icon"
            onClick={() => {
              setHasClicked(true);
              toggleFullScreen(true);
            }}
          >
            <GrExpand />
          </button>
        )}
      </div>
    </div>
  );
};
