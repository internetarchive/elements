import { describe, it, expect } from 'vitest';

import { CurationField } from './curation';

describe('CurationField', () => {
  it('parses the curator, date, and comment', () => {
    const field = new CurationField(
      '[curator]validator@archive.org[/curator][date]20201123141634[/date][comment]checked for malware[/comment]',
    );
    expect(field.value?.curator).to.equal('validator@archive.org');
    expect(field.value?.comment).to.equal('checked for malware');
    // the tag carries a compact timestamp, which parses as local time
    expect(field.value?.date?.getTime()).to.equal(
      new Date(2020, 10, 23, 14, 16, 34).getTime(),
    );
  });

  it('parses a state when the note carries one', () => {
    const field = new CurationField(
      '[curator]a@archive.org[/curator][state]approved[/state]',
    );
    expect(field.value?.state).to.equal('approved');
    expect(field.value?.comment).to.be.undefined;
  });

  it('leaves absent tags undefined', () => {
    const field = new CurationField('[comment]just a note[/comment]');
    expect(field.value?.comment).to.equal('just a note');
    expect(field.value?.curator).to.be.undefined;
    expect(field.value?.date).to.be.undefined;
    expect(field.value?.state).to.be.undefined;
  });

  it('rejects a value with no known tags but keeps the raw value', () => {
    const field = new CurationField('curated by somebody');
    expect(field.value).to.be.undefined;
    expect(field.rawValue).to.equal('curated by somebody');
  });

  it('ignores an empty tag', () => {
    const field = new CurationField(
      '[curator]a@archive.org[/curator][comment][/comment]',
    );
    expect(field.value?.curator).to.equal('a@archive.org');
    expect(field.value?.comment).to.be.undefined;
  });
});
