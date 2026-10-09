/**
 * log() utility -- production ignores 'log()' JS calls; dev invokes 'log()'
 */
const log: (...args: unknown[]) => void =
  location.hostname === 'localhost' ||
  location.host.match(/^(www|cat)-[a-z0-9]+\.archive\.org$/) ||
  location.host.match(/\.code\.archive\.org$/) ||
  location.host.match(/\.dev\.archive\.org$/) ||
  location.host.match(/^ia-petabox-/) ||
  location.host.match(/^internetarchive/)
    ? console.log.bind(console) // convenient, no?  Stateless function
    : () => {};

export { log as default };
