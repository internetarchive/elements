import { describe, it, expect } from 'vitest';
import { FilterMapBuilder } from './filter-map-builder';
import { FilterConstraint, FilterMap } from './search-params';

/**
 * Creates a filter map builder with the following structure:
 * ```
 * {
 *   'foo': {
 *     'bar': [INCLUDE, GREATER_OR_EQUAL],
 *     'beep': GREATER_THAN,
 *   },
 *   'baz': {
 *     'boop': EXCLUDE
 *   },
 * }
 * ```
 */
const getComplexFilterMapBuilder = (): FilterMapBuilder => {
  const builder = new FilterMapBuilder();
  builder.addFilter('foo', 'bar', FilterConstraint.INCLUDE);
  builder.addFilter('foo', 'bar', FilterConstraint.GREATER_OR_EQUAL);
  builder.addFilter('baz', 'boop', FilterConstraint.EXCLUDE);
  builder.addFilter('foo', 'beep', FilterConstraint.GREATER_THAN);
  return builder;
};

describe('filter map builder', () => {
  it('initializes with empty filter map', () => {
    expect(new FilterMapBuilder().build()).to.deep.equal({});
  });

  it('can add filters', () => {
    const builder = new FilterMapBuilder();
    builder.addFilter('foo', 'bar', FilterConstraint.INCLUDE);
    expect(builder.build()).to.deep.equal({ foo: { bar: 'inc' } });

    builder.addFilter('baz', 'boop', FilterConstraint.EXCLUDE);
    expect(builder.build()).to.deep.equal({
      foo: { bar: 'inc' },
      baz: { boop: 'exc' },
    });

    builder.addFilter('foo', 'beep', FilterConstraint.GREATER_THAN);
    expect(builder.build()).to.deep.equal({
      foo: { bar: 'inc', beep: 'gt' },
      baz: { boop: 'exc' },
    });
  });

  it('can add multiple constraints for one value', () => {
    const builder = new FilterMapBuilder();
    builder.addFilter('foo', 'bar', FilterConstraint.INCLUDE);
    expect(builder.build()).to.deep.equal({ foo: { bar: 'inc' } });

    builder.addFilter('foo', 'bar', FilterConstraint.GREATER_OR_EQUAL);
    expect(builder.build()).to.deep.equal({
      foo: { bar: ['inc', 'gte'] },
    });
  });

  it('can remove filters', () => {
    const builder = getComplexFilterMapBuilder();
    builder.removeFilters('foo', 'bar');
    expect(builder.build()).to.deep.equal({
      foo: { beep: 'gt' },
      baz: { boop: 'exc' },
    });

    builder.removeFilters('foo', 'beep');
    expect(builder.build()).to.deep.equal({ baz: { boop: 'exc' } });

    builder.removeFilters('not', 'exist');
    expect(builder.build()).to.deep.equal({ baz: { boop: 'exc' } });

    builder.removeFilters('baz', 'boop');
    expect(builder.build()).to.deep.equal({});
  });

  it('can remove single filters by constraint type', () => {
    const builder = getComplexFilterMapBuilder();
    builder.removeSingleFilter('foo', 'bar', FilterConstraint.GREATER_OR_EQUAL);
    expect(builder.build()).to.deep.equal({
      foo: { bar: 'inc', beep: 'gt' },
      baz: { boop: 'exc' },
    });

    builder.removeSingleFilter('foo', 'bar', FilterConstraint.EXCLUDE);
    expect(builder.build()).to.deep.equal({
      foo: { bar: 'inc', beep: 'gt' },
      baz: { boop: 'exc' },
    });

    builder.removeSingleFilter('foo', 'bar', FilterConstraint.INCLUDE);
    expect(builder.build()).to.deep.equal({
      foo: { beep: 'gt' },
      baz: { boop: 'exc' },
    });

    builder.removeSingleFilter('foo', 'beep', FilterConstraint.GREATER_THAN);
    builder.removeSingleFilter('baz', 'boop', FilterConstraint.EXCLUDE);
    expect(builder.build()).to.deep.equal({});

    builder.removeSingleFilter('not', 'exist', FilterConstraint.INCLUDE);
    expect(builder.build()).to.deep.equal({});
  });

  it('can be initialized with an existing filter map', () => {
    const builder = new FilterMapBuilder();
    const filterMap: FilterMap = {
      foo: {
        bar: FilterConstraint.INCLUDE,
      },
      baz: {
        boop: FilterConstraint.EXCLUDE,
      },
    };

    builder.setFilterMap(filterMap);
    expect(builder.build()).to.deep.equal({
      foo: { bar: 'inc' },
      baz: { boop: 'exc' },
    });
  });

  it('can be merged with an existing filter map', () => {
    const builder = new FilterMapBuilder();
    const filterMap: FilterMap = {
      foo: {
        bar: FilterConstraint.INCLUDE,
      },
      baz: {
        boop: [FilterConstraint.EXCLUDE, FilterConstraint.LESS_OR_EQUAL],
      },
    };

    builder.addFilter('foo', 'bar', FilterConstraint.GREATER_OR_EQUAL);
    builder.addFilter('foo', 'beep', FilterConstraint.LESS_OR_EQUAL);
    expect(builder.build()).to.deep.equal({
      foo: { bar: 'gte', beep: 'lte' },
    });

    builder.mergeFilterMap(filterMap);
    expect(builder.build()).to.deep.equal({
      foo: { bar: ['gte', 'inc'], beep: 'lte' },
      baz: { boop: ['exc', 'lte'] },
    });
  });

  describe('keys that name object internals', () => {
    it('ignores them instead of writing to Object.prototype', () => {
      const builder = new FilterMapBuilder();

      builder
        .addFilter('__proto__', 'polluted', FilterConstraint.INCLUDE)
        .addFilter('constructor', 'polluted', FilterConstraint.INCLUDE)
        .addFilter('subject', '__proto__', FilterConstraint.INCLUDE)
        .addFilter('subject', 'constructor', FilterConstraint.INCLUDE)
        .addFilter('prototype', 'x', FilterConstraint.INCLUDE);

      expect(({} as Record<string, unknown>).polluted).to.be.undefined;
      expect((Object as unknown as Record<string, unknown>).polluted).to.be
        .undefined;
      expect(builder.build()).to.deep.equal({});
    });

    it('ignores them when removing and merging', () => {
      const builder = new FilterMapBuilder();
      builder.addFilter('subject', 'a', FilterConstraint.INCLUDE);

      builder
        .removeFilters('__proto__', 'x')
        .removeSingleFilter('constructor', 'x', FilterConstraint.INCLUDE)
        .mergeFilterMap(
          JSON.parse('{"__proto__": {"polluted": "inc"}}') as FilterMap,
        );

      expect(({} as Record<string, unknown>).polluted).to.be.undefined;
      expect(builder.build()).to.deep.equal({
        subject: { a: FilterConstraint.INCLUDE },
      });
    });
  });
});
