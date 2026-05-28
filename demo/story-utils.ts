/* Converts a label to a usable input id, i.e. My setting -> my-setting */
export function labelToId(label: string): string {
  return label.toLowerCase().split(' ').join('-');
}
