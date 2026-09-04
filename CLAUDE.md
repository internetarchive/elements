# elements

A web component library from the Internet Archive, published as
`@internetarchive/elements`. See [README.md](README.md) for installation, usage,
adding a component, styling, and the component inventory.

Node 24+ and pnpm 11+. Use pnpm, never npm or yarn.

```zsh
pnpm install
pnpm run dev     # demo at the vite dev server
pnpm run test    # vitest in real chromium
pnpm run lint    # eslint + prettier --check, and CI enforces it
```

## Publishing

Publishing is driven entirely by **GitHub Releases**. Publishing a release fires
[.github/workflows/npm-publish.yml](.github/workflows/npm-publish.yml), which runs
`pnpm test` and then publishes to npm.

Never run `npm publish` by hand. The workflow uses npm trusted publishing over
OIDC and there is no npm token anywhere, so a publish can only come from the
workflow. A manual publish also lands with no provenance attestation, which is
how you tell the two apart after the fact:

```zsh
curl -s https://registry.npmjs.org/@internetarchive%2Felements/<version> \
  | python3 -c "import json,sys; print('provenance:', bool(json.load(sys.stdin)['dist'].get('attestations')))"
```

### The prerelease flag picks the dist-tag

That is the entire mechanism, and it is the part most easily gotten wrong:

| How the release is published | What the workflow runs | dist-tag |
| --- | --- | --- |
| Set as a pre-release | `npm publish --provenance --tag alpha` | `alpha` |
| Set as the latest release | `npm publish --provenance` | `latest` |

`latest` is what every unpinned or caret install resolves to. Publishing a
release without the prerelease flag set puts that code in front of every
consumer, so the flag is not cosmetic.

### The version comes from package.json, not the tag

The workflow bumps nothing. It checks out the released commit and publishes
whatever `package.json` says, so the tag name and the version have to agree.

Always bump with `pnpm version`, which edits `package.json`, commits, and creates
the matching tag in one step. The tag gets a `v` prefix from npm's default
`tag-version-prefix`. Never hand-write a tag.

### Prerelease, from a feature branch

Prereleases exist so a consumer (offshoot, bookreader) can pin real code from an
unmerged branch. Use the ticket key as the preid:

```zsh
pnpm version prerelease --preid=webdev-1234   # 0.2.12 -> 0.2.13-webdev-1234.0
git push && git push --tags
gh release create v0.2.13-webdev-1234.0 \
  --prerelease \
  --title v0.2.13-webdev-1234.0 \
  --notes "Prerelease of <what> for <consumer>. From PR #NN, not yet merged."
```

Re-running the same `pnpm version prerelease --preid=webdev-1234` increments the
counter (`.0` to `.1`), so a second round is the same three commands again.

The consumer pins the exact version, never a range:

```json
"@internetarchive/elements": "0.2.13-webdev-1234.0"
```

### Release, from main only

**A final version only ever comes off `main`.** A feature branch may publish a
prerelease and nothing else. A final is what `latest` points at, so it comes from
merged, reviewed code or not at all.

The version bump is its own PR, titled after the version (`v0.2.12 (#74)`). Once
that has merged:

```zsh
git checkout main && git pull
pnpm version [major | minor | patch]
git push && git push --tags
gh release create v0.2.13 --latest --generate-notes --title v0.2.13
```

### Gotchas

- **A failing test blocks the publish.** `pnpm test` runs first. If the GitHub
  release exists but npm never gained the version, read the workflow run before
  cutting anything new.
- **Push the tag before `gh release create`.** `--generate-notes` and the release
  itself both resolve the tag server-side.
- **A version can never be republished.** npm rejects a duplicate, so a botched
  publish needs a new version number rather than a retry.
- **`canary` and `rc` dist-tags are stale.** They point at old prereleases from
  manual publishes. The workflow only ever writes `alpha` and `latest`. Don't add
  more dist-tags.
- **Every final release must be tagged.** The tag is the only durable pointer from
  an npm version back to its source commit. `0.2.12` is the cautionary case: it is
  the current `latest` with no tag, no GitHub release, and no provenance, because
  it was published by hand.

## Worktrees

Feature work happens in a worktree, never on `main` in the primary checkout:

```zsh
git worktree add .claude/worktrees/WEBDEV-1234-short-description \
  -b WEBDEV-1234-short-description origin/main
```

`.claude/worktrees/` is gitignored. Bring a branch up to date by merging `main`
in, not rebasing: this repo squash-merges, so the merge commit collapses anyway.
