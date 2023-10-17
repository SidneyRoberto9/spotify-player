export function Login() {
  const loginUrl = process.env.NEXT_PUBLIC_SPOTIFY_AUTH_URL;

  return (
    <div className="max-w-xs md:max-w-lg w-full h-64 flex flex-col items-center justify-center bg-zinc-800 shadow-xl ring-4 ring-emerald-400 rounded-xl gap-10">
      <h1 className="text-2xl md:text-4xl font-bold text-zinc-100">Log in to Spotify</h1>

      <div className="text-zinc-100 text-center">
        <a
          href={loginUrl}
          className="py-2 md:px-16 px-12 bg-emerald-400 rounded-full md:text-sm text-xs text-black font-bold">
          Log In
        </a>
      </div>
    </div>
  );
}
