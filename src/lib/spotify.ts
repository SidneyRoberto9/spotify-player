import axios from 'axios';

import { SpotifyMusic, SpotifyArtist } from '@/models/spotify.model';

export async function login(code: string): Promise<ResponseToken> {
  const redirect_uri = process.env.NEXT_PUBLIC_SPOTIFY_AUTH_CALLBACK;

  const encoded = `Basic ${Buffer.from(
    `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`,
  ).toString('base64')}`;

  const { data } = await axios.post(
    'https://accounts.spotify.com/api/token',
    `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`,
    {
      headers: {
        Authorization: encoded,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  return data;
}

async function getAccessToken(refresh_token: string) {
  const encoded = `Basic ${Buffer.from(
    `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`,
  ).toString('base64')}`;

  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    {
      grant_type: 'refresh_token',
      refresh_token,
    },
    {
      headers: {
        Authorization: encoded,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  return response.data;
}

export async function topTracks(refresh_token: string): Promise<SpotifyMusic[]> {
  const { access_token } = await getAccessToken(refresh_token);

  const { data } = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return data.items;
}

export async function topArtists(refresh_token: string): Promise<SpotifyArtist[]> {
  const { access_token } = await getAccessToken(refresh_token);

  const { data } = await axios.get('https://api.spotify.com/v1/me/top/artists', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return data.items;
}
