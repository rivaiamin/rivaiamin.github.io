You have two different stacks serving one site:

| | **jrpg-profile** | **rivaiamin.github.io** |
|---|---|---|
| Framework | React + Vite SPA | SvelteKit (adapter-static) |
| 3D | React Three Fiber | Sketchfab iframe (current `/`) |
| Routes | Single page | `/`, `/profile`, `/cv` |
| Deploy | Not wired yet | GitHub Actions → `build/` |

The JRPG app already points at your SvelteKit pages (`/cv`, `/profile`, subprojects in `data.ts`), so the merge is mostly about **who owns `/`**.

---

## Recommendation: React island inside SvelteKit (best fit)

Keep SvelteKit as the single site. Mount the JRPG React app only on `/`.

Why this over the alternatives:

- **No rewrite** — R3F, Motion, and the whole UI stay in React; porting to Svelte/Threlte would be weeks of work.
- **One deploy** — Same `pnpm build` → `build/` flow you already use.
- **Other routes unchanged** — `/profile`, `/cv`, and future Svelte pages stay as they are.
- **Links already work** — Your warp points use `https://rivaiamin.github.io/cv` etc.; you can switch those to `/cv` and `/profile` for same-origin navigation.

### Shape of the repo

```
rivaiamin.github.io/
├── src/
│   ├── routes/
│   │   ├── +layout.svelte          # global layout (cv, profile)
│   │   ├── +layout@.svelte         # reset layout for homepage only
│   │   ├── +page.svelte            # thin wrapper: mount React app
│   │   ├── profile/+page.svelte    # unchanged
│   │   └── cv/+page.svelte         # unchanged
│   └── lib/
│       └── jrpg/                   # move/copy jrpg-profile src here
│           ├── App.tsx
│           ├── components/
│           ├── data.ts
│           └── ...
├── assets/                         # background.jpg, .glb, etc.
├── vite.config.ts                  # sveltekit + react + tailwind
└── package.json                    # add react, r3f, motion, three, etc.
```

### Key SvelteKit pieces

**1. Break out of the global layout on `/` only**

`+layout@.svelte` (layout reset) avoids loading Press Start 2P fonts and portfolio meta on the JRPG page:

```svelte
<!-- src/routes/+layout@.svelte -->
<script lang="ts">
  import '../../lib/jrpg/index.css';
</script>

<svelte:head>
  <title>Riva'i Amin - Developer Status Console</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<slot />
```

**2. Mount React from `+page.svelte`**

```svelte
<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  let container: HTMLDivElement;
  let root: import('react-dom/client').Root | undefined;

  onMount(async () => {
    if (!browser) return;
    const [{ createRoot }, { default: App }] = await Promise.all([
      import('react-dom/client'),
      import('$lib/jrpg/App'),
    ]);
    root = createRoot(container);
    root.render(App());
  });

  onDestroy(() => root?.unmount());
</script>

<div bind:this={container} class="jrpg-root"></div>
```

**3. Extend `vite.config.ts`**

```ts
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss(), sveltekit()],
  assetsInclude: ['**/*.glb'],
});
```

**4. SSR**

The JRPG app is client-only (Three.js, `localStorage`, audio). Disable SSR on the homepage:

```ts
// src/routes/+page.ts
export const ssr = false;
export const prerender = true; // still emits static index.html for GitHub Pages
```

With `ssr = false`, SvelteKit prerenders a shell and hydrates on the client — fine for a static GitHub Pages deploy.

---

## Alternative: post-build merge (keep repos separate)

If you want **jrpg-profile** to stay its own repo:

1. Build SvelteKit → `build/` (`profile.html`, `cv.html`, `_app/`, …).
2. Build jrpg-profile → `dist/`.
3. Run a merge script in CI:

```bash
# after both builds
cp jrpg-profile/dist/index.html build/index.html
cp -r jrpg-profile/dist/assets build/jrpg-assets   # avoid clashing with _app/
# patch index.html asset paths if needed
```

4. Remove or stub `src/routes/+page.svelte` so SvelteKit does not overwrite `index.html`, **or** always overwrite it in the merge step.

Pros: clean separation, no React in the SvelteKit dev server.  
Cons: two installs/builds, asset path care, harder local dev for the full site.

---

## What I would not do

| Approach | Why skip it |
|---|---|
| **Full Svelte port** | CharacterViewer + postprocessing + Motion = large rewrite for little gain |
| **iframe `/` → separate deploy** | Bad SEO, awkward fullscreen, clunky navigation |
| **Replace whole repo with React** | You lose SvelteKit for `/profile` and `/cv` |

---

## Small follow-ups after merge

1. **Internal links** — In `data.ts`, use `/cv` and `/profile` instead of full URLs so navigation stays on your domain.
2. **Layout/meta** — Move JRPG-specific `<title>` and OG tags into `+layout@.svelte` or a small `+page.svelte` `<svelte:head>` block (reuse copy from the current homepage).
3. **Tailwind** — Both apps use Tailwind v4; scope JRPG styles (e.g. `.jrpg-root { ... }`) so they do not leak into `/profile`.
4. **Bundle size** — React + Three only load on `/`; `/profile` and `/cv` stay lean Svelte chunks.

---

## Suggested path

Use the **React island** approach: move `jrpg-profile/src` into `rivaiamin.github.io/src/lib/jrpg/`, wire the homepage route, add React deps to the existing SvelteKit project. One repo, one CI job, SvelteKit everywhere except the homepage runtime.

If you want, I can do that merge in `rivaiamin.github.io` step by step (move files, update configs, fix links, verify `pnpm build`).