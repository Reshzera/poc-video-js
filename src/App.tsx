import "@videojs/react/video/skin.css";
import { useState } from "react";
import { Video, VideoPlayer, VideoSkin, usePlayer } from "@videojs/react/video";

const SOURCES = [
  {
    label: "Mux sample",
    src: "https://stream.mux.com/BV3YZtogl89mg9VcNBhhnHm02Y34zI1nlMuMQfAbl3dM/highest.mp4",
  },
  {
    label: "Big Buck Bunny",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
];

const RATES = [0.5, 1, 1.5, 2];

function formatTime(seconds: number): string {
  const s = Math.floor(seconds || 0);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

// Lives inside <VideoPlayer>, outside the skin: shows that the player
// store can be read and driven from any of your own components.
function ExternalControls() {
  const { play, pause, seek, setMuted, setPlaybackRate } = usePlayer();

  const { paused, currentTime, duration, volume, muted, playbackRate } =
    usePlayer((s) => ({
      paused: s.paused,
      currentTime: s.currentTime,
      duration: s.duration,
      volume: s.volume,
      muted: s.muted,
      playbackRate: s.playbackRate,
    }));

  return (
    <section className="panel">
      <h2>Custom controls (via usePlayer)</h2>
      <div className="row">
        <button onClick={() => (paused ? play() : pause())}>
          {paused ? "Play" : "Pause"}
        </button>
        <button onClick={() => seek(Math.max(0, currentTime - 10))}>
          -10s
        </button>
        <button onClick={() => seek(currentTime + 10)}>+10s</button>
        <button onClick={() => setMuted(!muted)}>
          {muted ? "Unmute" : "Mute"}
        </button>
      </div>
      <div className="row">
        <span>Speed:</span>
        {RATES.map((rate) => (
          <button
            key={rate}
            className={playbackRate === rate ? "active" : undefined}
            onClick={() => setPlaybackRate(rate)}
          >
            {rate}x
          </button>
        ))}
      </div>
      <dl className="state">
        <dt>Status</dt>
        <dd>{paused ? "paused" : "playing"}</dd>
        <dt>Time</dt>
        <dd>
          {formatTime(currentTime)} / {formatTime(duration)}
        </dd>
        <dt>Volume</dt>
        <dd>{muted ? "muted" : `${Math.round(volume * 100)}%`}</dd>
        <dt>Rate</dt>
        <dd>{playbackRate}x</dd>
      </dl>
    </section>
  );
}

export default function App() {
  const [source, setSource] = useState(SOURCES[0]);

  return (
    <main>
      <h1>Video.js 10 + React + TypeScript</h1>

      <div className="row">
        <span>Source:</span>
        {SOURCES.map((s) => (
          <button
            key={s.src}
            className={s.src === source.src ? "active" : undefined}
            onClick={() => setSource(s)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <VideoPlayer>
        <VideoSkin style={{ width: "100%", aspectRatio: "16 / 9" }}>
          <Video src={source.src} playsInline />
        </VideoSkin>
        <ExternalControls />
      </VideoPlayer>
    </main>
  );
}
