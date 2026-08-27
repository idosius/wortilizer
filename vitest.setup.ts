import '@testing-library/jest-dom/vitest'

// Node 22 ships a built-in `localStorage` global that is inert without the
// `--localstorage-file` flag. Because that global already exists, Vitest's jsdom
// environment skips copying jsdom's working Storage onto `globalThis`, leaving
// `localStorage` unusable in tests. Wire jsdom's real implementation back in.
const jsdomWindow = (
  globalThis as { jsdom?: { window: Window & typeof globalThis } }
).jsdom?.window

if (jsdomWindow) {
  for (const key of ['localStorage', 'sessionStorage'] as const) {
    Object.defineProperty(globalThis, key, {
      value: jsdomWindow[key],
      configurable: true,
      writable: false,
    })
  }
}
