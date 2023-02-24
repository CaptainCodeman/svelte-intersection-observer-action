# svelte-intersection-observer-action

Svelte use:action for element position notifications using IntersectionObserver.

Small. Efficient. SSR Friendly.

## Purpose

You need to know when an Element intersects another, as efficiently as possible, adding as few bytes to your project as possible.

The existing packages I looked at all had one or more issues:

- Not SSR compatible. Likely developed before SvelteKit, when Svelte was primarily used for client-side components.
- Used a Svelte Component as a wrapper. This adds unnecessary overhead and bytes to your bundle.
- Dispatch events. IMO this is also unnecessary and wasted bytes. A callback passed in to an action is simpler and more efficient.
- Create an IntersectionObserver instance per element. Slightly less efficient and a potential waste of runtime resources, especially if many elements need to be observed, vs using a single observer as intended.
- Only provide simplified event information, not the [complete set of IntersectionObserverEntry properties](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry).
- Lack of TypeScript support.

This package is simple, fast and efficient. It is only 372 bytes minified, 243 bytes minified and gzipped.

## Usage

Import using your package manager of choice, e.g.:

    pnpm i svelte-intersection-observer-action

### Within a Svelte Component

Import and apply to your HTML element. Provide the `callback` function that will be called with the `IntersectionObserverEntry` object. Optionally, provide additional `IntersectionObserver` options (`root`, `rootMargin`, and `thresholds`)

```svelte
<script lang="ts">
  import { intersect } from 'svelte-intersection-observer-action'

  let ratio = 0
  function callback(entry: IntersectionObserverEntry) {
    ratio = entry.intersectionRatio
  }

  // important: re-use options object for caching
  const options = { callback }
</script>

<div use:intersect={options}>
  {ratio}
</div>
```

### Within another Svelte `use:action`

Import inside your `use:action` module:

```ts
import { intersect } from 'svelte-intersection-observer-action'
```

Apply to the element passed in to your `use:action` and call the `destroy` method when your action is destroyed:

```ts
type Render = (ctx: CanvasRenderingContext2D) => void

export function lazyload(image: HTMLImageElement) {
  // use intersect action to watch element in viewport
  const callback = entry => loadImage()
  const intersectManager = intersect(image, { callback })

  // rest of use:action implementation
  function loadImage() {}

  return {
    destroy() {
      // remember to call destroy when this action is destroyed
      intersectManager.destroy()
    },
  }
}
```
