import { describe, expect, test } from 'vitest';
import collapseSpace from './collapse-space';

describe('collapseSpace', () => {
  test('leaves a field with no extra spaces unchanged', () => {
    expect(collapseSpace('I am a test')).to.equal('I am a test');
  });

  test('strips leading and trailing whitespace', () => {
    expect(collapseSpace('     I am a test    ')).to.equal('I am a test');
  });

  test('collapses internal extra whitespace', () => {
    expect(collapseSpace('I       am a     test')).to.equal('I am a test');
  });

  test('flattens existing returns', () => {
    expect(collapseSpace('I am a test\n\n\n\nYes I am.')).to.equal(
      'I am a test<br />Yes I am.',
    );
  });

  test('flattens existing \r\n returns', () => {
    expect(collapseSpace('I am a test\r\n\r\n\r\n\r\nYes I am.')).to.equal(
      'I am a test<br />Yes I am.',
    );
  });

  test('flattens duplicate line breaks', () => {
    expect(collapseSpace('I am a test<br><br><br>Yes I am.')).to.equal(
      'I am a test<br />Yes I am.',
    );

    expect(collapseSpace('I am a test<br  /><br /><br />Yes I am.')).to.equal(
      'I am a test<br />Yes I am.',
    );

    expect(collapseSpace('I am a test<br></br>Yes I am.')).to.equal(
      'I am a test<br />Yes I am.',
    );

    expect(collapseSpace('I am a test<br></br><br></br>Yes I am.')).to.equal(
      'I am a test<br />Yes I am.',
    );
  });

  test('flattens mixed line breaks', () => {
    expect(
      collapseSpace('I am a test\r\n\r\n\n\n<br></br><br />Yes I am.'),
    ).to.equal('I am a test<br />Yes I am.');
  });
  test('leaves pipes in the text alone', () => {
    // A pipe is an ordinary character in a review body, not whitespace.
    expect(collapseSpace('Rated 8|10 overall')).to.equal('Rated 8|10 overall');
    expect(collapseSpace('a|b')).to.equal('a|b');
  });
});
