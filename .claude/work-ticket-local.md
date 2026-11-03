# /iaux:work-ticket, the elements half

What `/iaux:work-ticket` reads before it claims. The pipeline is the plugin's;
this is only what's true of this repo.

- **Tickets are in Jira, PRs are on GitHub.** The key is `WEBDEV-1234`. It goes
  in the branch name and at the front of the PR title (`WEBDEV-1234: ...`),
  which is how Jira attaches the PR and how a later run finds it.
- **This repo is shared and published.** `@internetarchive/elements` goes to
  npm and offshoot, bookreader and collection-browser consume it. A ticket
  reached this run because a human labelled it `agent-ready`. Nothing else in
  the repo is yours to touch.

## Worktree

```bash
git fetch origin
git worktree add .claude/worktrees/$ARGUMENTS-<slug> -b $ARGUMENTS-<slug> origin/main
cd .claude/worktrees/$ARGUMENTS-<slug>
corepack pnpm install --frozen-lockfile
```

`.claude/worktrees/` is gitignored here, and it's the only place a worktree
goes. Never a sibling `elements-WEBDEV-*` directory.

Always `corepack pnpm`, never bare `pnpm` or `npm`. The repo pins pnpm 12 via
`packageManager`, and a different pnpm can rewrite the lockfile.
`--frozen-lockfile` because a run that quietly updates `pnpm-lock.yaml` puts a
dependency change in a diff that was meant to be a fix. Install also runs
`prepare`, which builds `dist/`. That's expected and `dist/` is gitignored.

If the branch is stacked (its PR's base isn't `main`), branch from that base
instead of `origin/main`, and see the stacking hazard below.

## Read first

- `CLAUDE.md` at the repo root: publishing, migrating a package in, worktrees.
- `README.md`, "Adding a Component": directory layout, naming, the story
  template, and styling. Most bad changes here are ones that skip it.

## House rules

- Elements use `customElement` from `@src/util/custom-element`, not Lit's own
  decorator. Shared types go in the element's `models.ts`.
- Every element has a `*-story.ts` next to it. The demo finds stories by glob,
  so a new element without one simply isn't on the demo page.
- Tests sit next to the code as `*.test.ts` and run in real Chromium.
- **No new dependency unless it's the point of the ticket.**
- **Comments describe the current state only.** No "instead of the old...".
- **Never bump the version or publish.** No `pnpm version`, no tags, no
  releases, no prerelease. A release is its own PR and a human's call.
- **Merge conflicts:** `pnpm-lock.yaml` takes `origin/main`'s side and gets
  regenerated with `corepack pnpm install`. Any other file: `git merge --abort`,
  describe both sides in the ticket, `agent-blocked`, stop.

## Verify

Run each one separately from the worktree, not chained with `&&`, so one
failure doesn't hide the others. All four are wireit scripts, so a step whose
inputs haven't changed can report as skipped from cache. That's a pass.

```bash
corepack pnpm run format      # eslint --fix + prettier --write over **/*.ts
corepack pnpm run typecheck   # tsc --noEmit; nothing else checks types
corepack pnpm run lint        # eslint + prettier --check, what CI runs
corepack pnpm run test        # madge --circular, then vitest in headless Chromium
```

`format` runs first so `lint` checks the result. It's safe repo-wide here
because `main` is format-clean, so if it touches a file you didn't edit,
revert that file rather than commit it. The whole set takes well under a
minute.

`test` is headless through `vite.config.ts`. Don't pass flags that make it
headed. If Chromium is missing, `corepack pnpm exec playwright install
chromium` once.

**Baselines on `main` (`95784c8`, 2026-09-30):**

- `test`: **736 tests across 34 files, all passing**
- `lint`: **0 errors, 11 warnings**

Those numbers drift as PRs land, and a stacked branch starts from a different
base (the topnav branch alone adds about 90 tests). So measure the baseline on
this branch's own base before trusting the figures above: in a fresh
worktree, run `test` once before your first commit. On a resumed or stacked
branch, check the base out in a second worktree under `.claude/worktrees/`,
run it there, and remove that worktree after. Fewer passing tests than the
base, or any failure, is a regression. More tests is fine if you added them.

CI runs `lint`, `typecheck` and `build` (the test job) as separate checks on
every PR, plus `deploy-preview` and CodeQL.

## QA

Every PR gets a live demo build. The `Deploy PR previews` workflow
(`.github/workflows/pr-preview.yml`) runs on open, reopen and every push,
drafts included. Its `deploy-preview` job runs `pnpm run ghpages:build` and
pushes the output to the `ghpages` branch under `pr/pr-<N>/`, and GitHub Pages
then publishes it at:

```
https://internetarchive.github.io/elements/pr/pr-<N>/
```

`main`'s demo, for comparison, is `https://internetarchive.github.io/elements/`.

To know the preview is your build and not the last push's:

```bash
gh pr checks <N> --watch            # wait for deploy-preview to pass
gh run list --workflow pages-build-deployment -L 1   # then wait for the Pages run after it
curl -s -o /dev/null -w '%{http_code}\n' https://internetarchive.github.io/elements/pr/pr-<N>/
```

The Pages run lands 30 to 60 seconds after `deploy-preview`. A sticky PR
comment also posts the URL. That's the page the fresh-context QA subagent
runs against, headless.

Deep links: `#elem-<tag>` focuses one element, e.g.
`https://internetarchive.github.io/elements/pr/pr-<N>/#elem-ia-button`. Give
QA steps a link like that rather than making someone scroll the full list.

For local QA, `corepack pnpm run dev` serves the demo from Vite. Stop the
server when you're done, since a leftover one holds the port.

If the change isn't reachable from the demo (a type, a build script, a test
helper), say so and let Verify be the verification.

## Hazards

- **Never push to `main`, never merge your own PR, never publish.** A human
  merges and a human releases.
- **Stacked PRs need `gh stack link`, not just chained bases.** Base each PR
  on the branch below it (`gh pr create --base <branch-below>`), then register
  the stack with `gh stack link <bottom> <middle> <top>` (the
  `github/gh-stack` extension). Chained bases alone leave nothing on GitHub
  saying the PRs belong together. `gh stack view` saying "not part of a stack"
  after a link is expected; check with
  `gh api repos/internetarchive/elements/stacks/<n>`.
- **Releases tag the bump PR's squash commit.** Don't run `pnpm version` on
  `main`: it bumps a second time and pushes an unreviewed commit (WEBDEV-9025,
  see `CLAUDE.md`). This run doesn't release anyway, but don't "fix" a version
  mismatch by bumping.
- **App CI must stay unfiltered on `pull_request`.** A `branches` filter
  matches the PR's base, not its head, so filtering on `main` silently skipped
  every stacked PR's CI (WEBDEV-8972). Don't add one back to
  `.github/workflows/ci.yml`.
- **If a `strings:build` step lands here, `format` runs after it.** elements
  has no `lit-localize build` step yet. When one arrives (offshoot has one),
  its generated files carry `eslint-disable` directives that `eslint --fix`
  strips, so run `format` after the build, never before, or the generated
  output fails lint (WEBDEV-8621).
- **The demo's hash focus mode and sidebar scroll spy break silently.**
  `demo/app-root.ts` renders one element when the hash is `#elem-<tag>` and
  highlights the sidebar from an IntersectionObserver in the all-elements
  view. Neither throws when broken, it just stops working. If the diff touches
  `demo/`, check both by hand on the preview: open `#elem-ia-button` and
  confirm only that element shows, then clear the hash, scroll, and confirm
  the sidebar highlight follows. `demo/app-root.test.ts` covers some of it,
  not all.
- **The Jira ticket belongs to the team.** Don't transition it, reassign it,
  change its sprint or story points, or comment on it. Status goes into the
  description through the plugin's script, never a comment.
- **The baseline differs by branch.** See Verify. Don't call a stacked
  branch's higher test count a problem, or its lower one fine, without
  measuring its base.
