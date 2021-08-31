import { useState, useCallback, useEffect } from 'react';
import ReactYouTube from 'react-youtube';
import cn from 'classnames';
import s from './YouTube.module.css';
import type { VFC } from 'react';
import type { YouTubePlayer } from 'youtube-player/dist/types';

type Props = {
  className?: string;
  videoId?: string;
  isLoop?: boolean;
  isFit?: boolean;
  isAuto?: boolean;
};

const usePlayer = ({ isLoop, isAuto }: Pick<Props, 'isLoop' | 'isAuto'>) => {
  const [player, setPlayer] = useState<YouTubePlayer>();
  const onReady = useCallback(
    (event) => {
      const player = event.target as YouTubePlayer;
      if (isLoop) {
        setPlayer(player);
      }
      if (isAuto) {
        player.playVideo();
      }
    },
    [isLoop, isAuto]
  );
  const onEnd = useCallback(() => {
    if (player && isLoop) {
      player.playVideo();
    }
  }, [player, isLoop]);
  useEffect(() => {
    if (isLoop) {
      let timerId: NodeJS.Timer;
      if (player) {
        timerId = setInterval(() => {
          const duration = player.getDuration();
          const currentTime = player.getCurrentTime();
          if (duration - 1 < currentTime) {
            player.seekTo(1, true);
          }
        }, 500);
      }
      return () => {
        clearInterval(timerId);
      };
    }
  }, [isLoop, player]);
  return { onReady, onEnd };
};

const YouTube: VFC<Props> = ({
  className,
  videoId,
  isLoop,
  isFit = false,
  isAuto = false,
}) => {
  const { onReady, onEnd } = usePlayer({ isLoop, isAuto });
  return (
    <ReactYouTube
      containerClassName={cn(s.video, { [s.isFit]: isFit }, className)}
      className={cn('w-full', 'h-full')}
      videoId={videoId}
      opts={{
        playerVars: {
          autoplay: isAuto ? 1 : 0,
          controls: 0,
          loop: 1,
          mute: 1,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          showinfo: 0,
          playsinline: 1,
        },
      }}
      onReady={onReady}
      onEnd={onEnd}
    />
  );
};

export default YouTube;
