// Guard: this repository is pnpm-only (see "packageManager" in package.json).
// Runs as the `preinstall` lifecycle script.
//
// Deny-list, not allow-list: fail only for managers we positively recognize as
// not-pnpm. An empty/unknown user-agent passes, since pnpm's user-agent is not
// reliably `pnpm/...` in every CI image and an allow-list would false-reject it.
const pm = (process.env.npm_config_user_agent || '').split('/')[0];

if (['npm', 'yarn', 'bun'].includes(pm)) {
  console.error(
    `\nThis repo is pnpm-only (detected ${pm}). ` +
      `Run: pnpm install\n` +
      `(enable it with corepack enable, or see https://pnpm.io/installation)\n`,
  );
  process.exit(1);
}
