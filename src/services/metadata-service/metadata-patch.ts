/** A metadata field value as MDAPI stores it: one string, or a list of them */
export type MetadataFieldValue = string | string[];

/** One JSON Patch (RFC 6902) operation, as MDAPI's write endpoint accepts */
export type MetadataPatchOperation =
  | { op: 'add' | 'replace'; path: string; value: unknown }
  | { op: 'remove'; path: string };

/** Escapes a metadata key for use as a JSON Pointer segment (RFC 6901) */
function pointerFor(field: string): string {
  return `/${field.replace(/~/g, '~0').replace(/\//g, '~1')}`;
}

/** MDAPI's storage shape: a one-entry list collapses to a bare string */
function normalize(
  value: MetadataFieldValue | undefined,
): MetadataFieldValue | undefined {
  return Array.isArray(value) && value.length === 1 ? value[0] : value;
}

function isEmpty(value: MetadataFieldValue | undefined): boolean {
  if (value == null) return true;
  if (Array.isArray(value)) return value.length === 0;
  return value === '';
}

/**
 * Builds the JSON Patch that sets one metadata field to `value`, given the
 * field's current value.
 *
 * A single-entry list is written as a bare string, which is how MDAPI stores
 * a one-value field, and an empty string or list removes the field. Returns
 * an empty patch when nothing changes, since MDAPI rejects a write that
 * doesn't modify the item.
 */
export function buildMetadataFieldPatch(
  field: string,
  value: MetadataFieldValue,
  current: MetadataFieldValue | undefined,
): MetadataPatchOperation[] {
  const path = pointerFor(field);
  const next = normalize(value);
  const existing = normalize(current);

  if (next == null || isEmpty(next)) {
    return isEmpty(existing) ? [] : [{ op: 'remove', path }];
  }

  if (JSON.stringify(next) === JSON.stringify(existing)) return [];

  const op = isEmpty(existing) ? 'add' : 'replace';
  return [{ op, path, value: next }];
}
