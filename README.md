# Video.js React POC

React + TypeScript single-page app (Vite) using [Video.js 10](https://videojs.org) via `@videojs/react`.

```sh
npm install
npm run dev
```

What it shows (`src/App.tsx`):

- `VideoPlayer` + `VideoSkin` + `Video`: the default Video.js skin with built-in controls.
- `usePlayer()`: a custom React panel outside the skin that reads player state (time, volume, rate)
  and calls store actions (`play`, `pause`, `seek`, `setMuted`, `setPlaybackRate`).
- Switching the source by changing the `src` prop.

Note: in v10 the `video.js` npm package is only a shim. Players live in `@videojs/react` / `@videojs/html`.
