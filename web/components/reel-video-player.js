/* eslint-disable @next/next/no-img-element */
import classNames from "classnames";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import urlForSanitySource from "../lib/urlForSanitySource";
import { VideoPlayerControlBar } from "./video-player-control-bar";
import useInterval from "../hooks/useInterval";
import useIsDesktop from "../hooks/useIsDesktop";
import screenfull from "screenfull";

const ReelVideoPlayer = ({
  video,
  autoPlay,
  videoWidthAspectRatio,
  videoHeightAspectRatio,
}) => {
  const isDesktop = useIsDesktop();
  const [videoPlaying, setVideoPlaying] = useState(false);
  const player = useRef(null);
  const scrubber = useRef(null);
  const [scrubberWidth, setScrubberWidth] = useState(0);
  const [scrubberPosition, setScrubberPosition] = useState(0);
  const [totalPlaySeconds, setTotalPlaySeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);

  const toggleFullScreen = (onOff) => {
    const element = document.querySelector(".bpd-player-container");
    if (onOff) {
      if (screenfull.isEnabled) {
        screenfull.request(element);
      }
      setIsFullscreen(true);
    } else {
      if (screenfull.isEnabled) {
        screenfull.exit();
      }
      setIsFullscreen(false);
    }
  };

  const handleFullScreenChange = (event) => {
    if (screenfull.isFullscreen) {
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on("change", handleFullScreenChange);
    }

    return () => {
      if (screenfull.isEnabled) {
        screenfull.off("change", handleFullScreenChange);
      }
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setScrubberWidth(scrubber?.current?.clientWidth || 100);
    }, 1000);
  }, [scrubber]);

  useEffect(() => {
    if (hasClicked) {
      setMuted(false);
      setVolume(0.5);
    }
  }, [hasClicked]);

  useEffect(() => {
    if (hasClicked && video) {
      setIsPlaying(true);
    }
  }, [hasClicked, video]);

  useInterval(
    () => {
      if (
        player.current &&
        typeof player.current.getCurrentTime === "function"
      ) {
        setScrubberPosition(
          (player.current.getCurrentTime() / totalPlaySeconds) * scrubberWidth
        );
      }
    },
    isPlaying ? 75 : null
  );

  useLayoutEffect(() => {
    if (!player.current) {
      return;
    }
    if (muted) {
      player.current.muted = true;
    } else {
      player.current.muted = false;
    }
  }, [muted]);

  return (
    <article
      className={classNames(
        {
          "h-screen flex flex-col justify-center items-center": isFullscreen,
        },
        "bpd-player-container relative z-20 border-2 border-gold px-4 py-2"
      )}
    >
      <div
        className={classNames(
          {
            "w-full": isFullscreen,
            container: !isFullscreen,
          },
          "mx-auto transition-all duration-700"
        )}
      >
        <div
          className={classNames(
            `lg:my-0 relative`,
            `aspect-w-${videoWidthAspectRatio} aspect-h-${videoHeightAspectRatio}`,
            `transition-all duration-700`
          )}
        >
          <ReactPlayer
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen={true}
            controls={false}
            frameBorder="0"
            height={`100%`}
            muted={muted}
            loop={autoPlay}
            onReady={() => {
              setTimeout(() => {
                if (
                  player?.current &&
                  typeof player?.current?.getDuration === "function"
                ) {
                  setTotalPlaySeconds(player?.current?.getDuration() || 0);
                }
              }, [500]);
            }}
            onEnded={() => {
              setIsPlaying(false);
            }}
            onPlay={async () => {
              setIsPlaying(true);
            }}
            onPause={() => {
              setIsPlaying(false);
            }}
            playing={isPlaying}
            ref={player}
            title="Ravens"
            url={`https://player.vimeo.com/video/${video}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
            volume={volume}
            width={`100%`}
          ></ReactPlayer>
        </div>
        <div className={classNames({ "-mt-12": isFullscreen })}>
          <VideoPlayerControlBar
            isFullscreen={isFullscreen}
            player={player}
            muted={muted}
            setMuted={setMuted}
            setVolume={setVolume}
            scrubber={scrubber}
            scrubberWidth={scrubberWidth}
            scrubberPosition={scrubberPosition}
            setScrubberPosition={setScrubberPosition}
            setHasClicked={setHasClicked}
            setVideoPlaying={setVideoPlaying}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            toggleFullScreen={toggleFullScreen}
            videoPlaying={videoPlaying}
          />
        </div>
      </div>
    </article>
  );
};
export default ReelVideoPlayer;
