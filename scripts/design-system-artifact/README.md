# The design-system artifact

Builds the files of the org's
[design-system artifact](https://claude.ai/artifact/QH1DfJLQ5oA9KQtbnkiL8j), the
Internet Archive design system that Claude's decks and designs use by default.
It holds the tokens, the guidelines in `docs/`, and React components over the
elements in `src/`, each with a live preview.

```zsh
pnpm run design-system
```

That builds the tokens and icons, then writes `temp/design-system-artifact/`
(gitignored):

- `project/`: the artifact's files at their published paths.
- `test/`: each preview as the artifact frames it. Serve the folder and open
  `test/index.html`, which loads every preview and lists its errors.

The README and file headers say what the files were built from:
`elements <version> @ <commit>` by default. To name it yourself, run the script
directly (wireit's shell drops a `#` and everything after it):

```zsh
node scripts/design-system-artifact/build.mts --source "elements 1.11.0 @ 1a2b3c4"
```

## What builds what

| Published file                   | From                                                                                        |
| -------------------------------- | ------------------------------------------------------------------------------------------- |
| `components/bundle.js`           | `entry.ts`, bundled with esbuild. React stays external (`window.React`)                     |
| `components/bundle.css`          | the border, motion and inverse tokens from `demo/docs/assets/tokens.css`, then `ia.css`     |
| `tokens.json`, `tokens.css`      | `tokens/tokens.json`, in the artifact's list format with values resolved to px              |
| `components/<Name>/*`            | `components.mts` for most; `static/components/` for the first seven, which are hand-written |
| `components/index.d.ts`          | `static/components/index.d.ts` plus a declaration per `components.mts` entry                |
| `README.md`, `components/Cover/` | `static/`, with `{{SOURCE}}` and the component count filled in                              |
| `guidelines/`                    | `docs/`, its README as `index.md`                                                           |

`project/design-system.json`, the artifact's index, isn't built here. It
belongs to the artifact: read it, change only `lastChange`, and write it back.

## Adding a component

1. Wrap it in `entry.ts` with `createComponent`, mapping its events to `onX`
   props.
2. Add an entry to `components.mts`: a summary, the props, and stories that
   cover its states.
3. If it needs a service a preview can't reach (a payment provider, the lending
   API, item files, a `<modal-manager>`), add a mock to `mocks.ts` rather than
   leaving the preview out. Start from the repo's own test helpers and story
   data. The mocks are on `window.IADesignSystem.demo`; say in the component's
   `notes` what is mocked and what a real page supplies.

Previews make no network requests: draw images as SVG data URLs and answer
fetches locally. Put a component on the surface it's drawn for; the player parts
and the image viewer are drawn for `--ia-color-surface-theater`.

## Publishing

1. Run the build and open `test/index.html` over a local server. Every line
   should read `errors=[]`. Look at the previews you changed.
2. Publish the changed files under `project/` to the artifact with the Artifact
   tool (`root` = `temp/design-system-artifact`, `files` = the changed paths).
   Type files (`.d.ts`) need `contentType: "text/plain"`.
3. Last, read `project/design-system.json` from the artifact, set its
   `lastChange` (`by`, `at`, `via`, and a `note` naming the version and commit),
   and publish it.
