'use client';

import { ReactNode, useState, useEffect, useContext, createContext } from 'react';

import {
  SpotifyMusicView,
  SpotifyMusic,
  SpotifyArtistView,
  SpotifyArtist,
} from '@/models/spotify.model';
import { topTracks, topArtists, login } from '@/lib/spotify';

interface SpotifyContextProps {
  isAuth: boolean;
  isLoading: boolean;
  refresh_token: string;
  topTracksData: SpotifyMusicView[];
  topArtistsData: SpotifyArtistView[];
  loginIn: (code: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface SpotifyContextProviderProps {
  children: ReactNode;
}

const initialContext: SpotifyContextProps = {
  isAuth: false,
  isLoading: true,
  refresh_token: '',
  topTracksData: [],
  topArtistsData: [],
  loginIn: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

const SpotifyContext = createContext<SpotifyContextProps>(initialContext);

export function SpotifyContextProvider({ children }: SpotifyContextProviderProps) {
  const [refreshToken, setRefreshToken] = useState<string>(initialContext.refresh_token);
  const [loading, setLoading] = useState<boolean>(true);
  const [topTracksData, setTopTracksData] = useState<SpotifyMusicView[]>([]);
  const [topArtistsData, setTopArtistsData] = useState<SpotifyArtistView[]>([]);

  async function loginIn(code: string) {
    const { refresh_token } = await login(code);
    setRefreshToken(refresh_token);
    localStorage.setItem('@/spotify/refresh-token', refresh_token);
  }

  async function logout() {
    setRefreshToken('');
    localStorage.removeItem('@/spotify/refresh-token');
  }

  async function getTopTracks(): Promise<SpotifyMusicView[]> {
    if (refreshToken === '') {
      return [];
    }

    const items = await topTracks(refreshToken);
    const itemsSorted = items.sort(randOrd);
    const tracks: SpotifyMusicView[] = itemsSorted.map((track: any) => ({
      title: track.name,
      artist: track.artists.map((_artist: any) => _artist.name).join(', '),
      url: track.external_urls.spotify,
      coverImage: track.album.images[1],
    }));

    return tracks;
  }

  async function getTopArtists(): Promise<SpotifyArtistView[]> {
    if (refreshToken === '') {
      return [];
    }

    const items = await topArtists(refreshToken);

    const artists: SpotifyArtistView[] = items.slice(0, 3).map((artist) => ({
      name: artist.name,
      url: artist.external_urls.spotify,
      coverImage: artist.images[1],
      popularity: artist.popularity,
    }));

    return artists;
  }

  useEffect(() => {
    const item = localStorage.getItem('@/spotify/refresh-token');
    if (item) {
      setRefreshToken(item);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (refreshToken != '') {
      getTopTracks().then((tracks) => setTopTracksData(tracks));
      getTopArtists().then((artists) => setTopArtistsData(artists));
    }
  }, [refreshToken]);

  return (
    <SpotifyContext.Provider
      value={{
        isAuth: refreshToken != '',
        isLoading: loading,
        refresh_token: refreshToken,
        topTracksData,
        topArtistsData,
        loginIn,
        logout,
      }}>
      {children}
    </SpotifyContext.Provider>
  );
}

function randOrd() {
  return Math.round(Math.random()) - 0.5;
}

export const useSpotify = () => useContext(SpotifyContext);
