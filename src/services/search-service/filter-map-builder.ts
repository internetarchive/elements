import { FilterConstraint, FilterMap } from './search-params';

/**
 * A utility class for building filter maps
 */
export class FilterMapBuilder {
  private filterMap: FilterMap = {};

  /**
   * Adds a filter to the FilterMap under construction.
   * If existing constraint(s) already exist for this field and value, then the old and new constraints
   * will be joined into a single array.
   * @param field The field to filter on (e.g., 'subject', 'year', ...)
   * @param value The value of the field to filter on (e.g., 'Cicero', '1920', ...)
   * @param constraint The constraint to apply to the `field`, with respect to the given `value`.
   * Allowed values are the enum members of `FilterConstraint`.
   */
  addFilter(field: string, value: string, constraint: FilterConstraint): this {
    if (!this.filterMap[field]) {
      this.filterMap[field] = {};
    }

    // If there are already constraints for this value, concat them into an array
    if (this.filterMap[field][value]) {
      const mergedConstraints = ([] as FilterConstraint[]).concat(
        this.filterMap[field][value],
        constraint,
      );

      // Ensure there are no duplicate constraints in the array
      this.filterMap[field][value] = Array.from(new Set(mergedConstraints));
    } else {
      // Otherwise just use the provided value
      this.filterMap[field][value] = constraint;
    }

    return this;
  }

  /**
   * Removes a single filter currently associated with the given field, value, and constraint type.
   * @param field The field to remove a filter for
   * @param value The value to remove the filter for
   * @param constraint The constraint type to remove for this field and value
   */
  removeSingleFilter(
    field: string,
    value: string,
    constraint: FilterConstraint,
  ): this {
    if (!this.filterMap[field]?.[value]) return this;

    const constraints = ([] as FilterConstraint[]).concat(
      this.filterMap[field][value],
    );
    const constraintIndex = constraints.indexOf(constraint);
    if (constraintIndex >= 0) {
      constraints.splice(constraintIndex, 1);
    }

    // 2 or more constraints -> leave as array
    // 1 constraint -> pull out single constraint
    // 0 constraints -> delete the value entirely
    this.filterMap[field][value] =
      constraints.length === 1 ? constraints[0] : constraints;
    if (constraints.length === 0) {
      delete this.filterMap[field][value];
    }

    this.deleteFieldIfEmpty(field);
    return this;
  }

  /**
   * Removes any filters currently associated with the given field and value.
   * @param field The field to remove a filter for
   * @param value The value to remove the filter for
   */
  removeFilters(field: string, value: string): this {
    if (!this.filterMap[field]) return this;

    delete this.filterMap[field][value];
    this.deleteFieldIfEmpty(field);
    return this;
  }

  /** If there are no remaining filters for this field, deletes the whole field object. */
  private deleteFieldIfEmpty(field: string): void {
    const filters = this.filterMap[field];
    if (filters && Object.keys(filters).length === 0) {
      delete this.filterMap[field];
    }
  }

  /**
   * Initializes the filter map under construction to have filters exactly equal to the given one.
   * This will overwrite *all* existing filters already added to the builder.
   * @param map The FilterMap to set this builder's state to.
   */
  setFilterMap(map: FilterMap): this {
    this.filterMap = { ...map };
    return this;
  }

  /**
   * Adds all filters from an existing filter map to the one being built.
   * Filters from the provided map may overwrite existing filters already added to the builder.
   * @param map The FilterMap to merge into the one being built.
   */
  mergeFilterMap(map: FilterMap): this {
    for (const [field, filters] of Object.entries(map)) {
      for (const [value, constraint] of Object.entries(filters)) {
        // There may be either a single constraint or an array of them
        if (Array.isArray(constraint)) {
          for (const subConstraint of constraint) {
            this.addFilter(field, value, subConstraint);
          }
        } else {
          this.addFilter(field, value, constraint);
        }
      }
    }
    return this;
  }

  /**
   * Produces a `FilterMap` including all the filters that have been applied to
   * this builder.
   */
  build(): FilterMap {
    return this.filterMap;
  }
}
