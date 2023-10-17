'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

import { useSpotify } from '@/context/useSpotify';
import LoadingPage from '@/components/LoadingPage';

function generatePlayUrl(id: string) {
  return `https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`;
}

export function Player() {
  const { topTracksData } = useSpotify();

  if (topTracksData.length === 0) {
    return <LoadingPage />;
  }

  const tracksIds = topTracksData.map(({ url }) => url.split('/')[url.split('/').length - 1]);

  const [playId, setPlayId] = useState<string>(tracksIds[0]);
  const [actualIndexPlayId, setActualIndexPlayId] = useState<number>(0);

  const maxIndexPlayId = tracksIds.length - 1;

  const isLastPlay = actualIndexPlayId === maxIndexPlayId;
  const isFirstPlay = actualIndexPlayId === 0;

  const [playUrl, setPlayUrl] = useState<string>(generatePlayUrl(playId));

  function nextPlay() {
    if (isLastPlay) {
      return;
    }
    setActualIndexPlayId((prev) => prev + 1);
    setPlayId(tracksIds[actualIndexPlayId + 1]);
  }

  function previousPlay() {
    if (isFirstPlay) {
      return;
    }
    setActualIndexPlayId((prev) => prev - 1);
    setPlayId(tracksIds[actualIndexPlayId - 1]);
  }

  useEffect(() => {
    setPlayUrl(generatePlayUrl(playId));
  }, [playId]);

  return (
    <div className="m-4 flex flex-col items-center relative">
      <h1 className="text-zinc-100 m-4 text-lg absolute">{`${actualIndexPlayId + 1} of ${
        maxIndexPlayId + 1
      }`}</h1>

      <div className="flex items-center justify-center gap-5">
        {isFirstPlay ? (
          <ChevronLeft size={55} className="text-zinc-600 " />
        ) : (
          <ChevronLeft
            size={55}
            className="text-emerald-400 cursor-pointer"
            onClick={previousPlay}
          />
        )}
        <div className="max-w-md">
          <iframe
            className="border-emerald-400 border-4 rounded-2xl h-96 bg-zinc-800 shadow-xl"
            width="100%"
            height="384"
            title="Spotify Embed: Ashes"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            src={playUrl}></iframe>
        </div>

        {isLastPlay ? (
          <ChevronRight size={55} className="text-zinc-600 " />
        ) : (
          <ChevronRight size={55} className="text-emerald-400 cursor-pointer" onClick={nextPlay} />
        )}
      </div>
    </div>
  );
}
