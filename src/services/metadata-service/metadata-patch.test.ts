import { describe, it, expect } from 'vitest';
import { buildMetadataFieldPatch } from './metadata-patch';

describe('buildMetadataFieldPatch', () => {
  it('replaces an existing field', () => {
    expect(buildMetadataFieldPatch('title', 'New', 'Old')).to.deep.equal([
      { op: 'replace', path: '/title', value: 'New' },
    ]);
  });

  it('adds a field that is absent', () => {
    expect(buildMetadataFieldPatch('volume', ['2'], undefined)).to.deep.equal([
      { op: 'add', path: '/volume', value: '2' },
    ]);
  });

  it('writes a single-entry list as a bare string', () => {
    expect(
      buildMetadataFieldPatch('subject', ['one'], ['one', 'two']),
    ).to.deep.equal([{ op: 'replace', path: '/subject', value: 'one' }]);
  });

  it('keeps multiple values as a list', () => {
    expect(buildMetadataFieldPatch('subject', ['a', 'b'], 'a')).to.deep.equal([
      { op: 'replace', path: '/subject', value: ['a', 'b'] },
    ]);
  });

  it('removes a field set to nothing', () => {
    expect(buildMetadataFieldPatch('notes', [], 'old')).to.deep.equal([
      { op: 'remove', path: '/notes' },
    ]);
    expect(buildMetadataFieldPatch('notes', '', ['a', 'b'])).to.deep.equal([
      { op: 'remove', path: '/notes' },
    ]);
  });

  it('returns an empty patch when nothing changes', () => {
    expect(buildMetadataFieldPatch('title', ['Same'], 'Same')).to.deep.equal(
      [],
    );
    expect(buildMetadataFieldPatch('title', 'Same', ['Same'])).to.deep.equal(
      [],
    );
    expect(buildMetadataFieldPatch('notes', [], undefined)).to.deep.equal([]);
  });

  it('escapes the key as a JSON Pointer', () => {
    expect(buildMetadataFieldPatch('a/b~c', 'x', undefined)).to.deep.equal([
      { op: 'add', path: '/a~1b~0c', value: 'x' },
    ]);
  });
});
