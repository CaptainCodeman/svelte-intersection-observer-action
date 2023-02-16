// keep track of which resize callback is associated with each element
type IntersectionCallback = (entry: IntersectionObserverEntry) => void
const intersectionCallbacks = new WeakMap<Element, IntersectionCallback>()

// defined outside of action, so we only create a single instance
let intersectionObserver: ResizeObserver

export function intersect(target: Element, callback: IntersectionCallback) {
  // create on first use, inside the action, so we're SSR friendly
  intersectionObserver = intersectionObserver || new IntersectionObserver(entries => {
    for (const entry of entries) {
      const callback = intersectionCallbacks.get(entry.target)
      if (callback) {
        callback(entry)
      }
    }
  })

  intersectionCallbacks.set(target, callback)
  intersectionObserver.observe(target)

  return {
    destroy() {
      intersectionObserver.unobserve(target)
      intersectionCallbacks.delete(target)
    }
  }
}