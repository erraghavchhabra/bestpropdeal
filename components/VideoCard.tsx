"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface Props {
  id: string;
  src: string;
  playingId: string | null;
  setPlayingId: (id: string | null) => void;
}

export default function VideoCard({
  id,
  src,
  playingId,
  setPlayingId,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);

  const isPlaying = playingId === id;

  useEffect(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setUserInteracted(true);

    if (isPlaying) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="group relative h-full rounded-3xl overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        muted={isMuted}
        loop
        playsInline
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition" />

      <div className="absolute top-4 right-4 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition">
        {userInteracted && (
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-black/45 flex items-center justify-center"
          >
            {isPlaying ? (
              <Pause size={16} className="text-white" />
            ) : (
              <Play size={16} className="text-white fill-white" />
            )}
          </button>
        )}

        <button
          onClick={toggleMute}
          className="w-10 h-10 rounded-full bg-black/45 flex items-center justify-center"
        >
          {isMuted ? (
            <VolumeX size={16} className="text-white" />
          ) : (
            <Volume2 size={16} className="text-white" />
          )}
        </button>
      </div>

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={togglePlay}
            className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center"
          >
            <Play size={34} className="text-white fill-white ml-1" />
          </button>
        </div>
      )}
    </div>
  );
}