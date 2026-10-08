/**
 * Encapsulates the cell- and row-height tracking for the virtualized scroller.
 * Can be used to record cell heights whenever they change, and calculate (or
 * estimate) the corresponding row heights based on the maximum cell height in
 * each row. The estimates automatically fall back to measured placeholder height
 * or the given default row height as needed.
 */
export class RowHeightCache {
  private _cellHeights = new Map<number, number>();

  private _rowHeights = new Map<number, number>();

  private _placeholderRowHeight: number | undefined;

  private _defaultRowHeight: number;

  private _columnsPerRow = 1;

  constructor(initialDefaultRowHeight: number) {
    this._defaultRowHeight = initialDefaultRowHeight;
  }

  /**
   * Live readonly view of the per-cell height map. To change cell heights, use
   * other methods like `recordCellHeight` and `deleteCellHeight`.
   */
  get cellHeights(): ReadonlyMap<number, number> {
    return this._cellHeights;
  }

  /**
   * Live readonly view of the per-row height map. To update row heights from
   * their cells, use `recalculateRowHeight` or `recalculateAllRowHeights`.
   */
  get rowHeights(): ReadonlyMap<number, number> {
    return this._rowHeights;
  }

  get columnsPerRow(): number {
    return this._columnsPerRow;
  }

  set columnsPerRow(numCols: number) {
    this._columnsPerRow = numCols;
  }

  get defaultRowHeight(): number {
    return this._defaultRowHeight;
  }

  set defaultRowHeight(newHeight: number) {
    this._defaultRowHeight = newHeight;
  }

  get placeholderRowHeight(): number | undefined {
    return this._placeholderRowHeight;
  }

  set placeholderRowHeight(newHeight: number | undefined) {
    this._placeholderRowHeight = newHeight;
  }

  /**
   * Returns the measured height of the given row if available in the cache,
   * or falls back to either the placeholder estimate or the default row height
   * otherwise.
   *
   * @param row Row index to get the height of
   */
  rowHeightFor(row: number): number {
    return (
      this._rowHeights.get(row) ??
      this._placeholderRowHeight ??
      this._defaultRowHeight
    );
  }

  /**
   * Sums the (estimated or measured) heights of all rows in the inclusive
   * range `[startRow, endRow]`, plus (optionally) any row gap between them.
   * Can therefore be used to calculate either the total scroll-spacer height
   * (sum across all rows) or a smaller range (e.g., everything preceding the
   * buffer's first row) as needed. Returns 0 when the range is empty.
   *
   * @param startRow The first row to include in the sum
   * @param endRow The last row to include in the sum
   * @param rowGap An optional row gap to include in the height sum between
   * all included rows. Defaults to 0 if not provided.
   */
  sumRowHeights(startRow: number, endRow: number, rowGap = 0): number {
    if (endRow < startRow) return 0;
    let total = 0;
    for (let row = startRow; row <= endRow; row += 1) {
      total += this.rowHeightFor(row);
    }
    total += Math.max(0, endRow - startRow) * rowGap;
    return total;
  }

  /**
   * Records the measured height of a cell and recomputes its row's height
   * as the max over all measured cells in that row.
   *
   * @param cellIndex The index of the cell to record a height for
   * @param height The new cell height to record
   */
  recordCellHeight(cellIndex: number, height: number): void {
    this._cellHeights.set(cellIndex, height);
    this.recalculateRowHeight(Math.floor(cellIndex / this._columnsPerRow));
  }

  /**
   * Deletes the cellHeights entry for `cellIndex`. Returns true if the
   * entry was present. Callers may decide whether to follow up with
   * `recalculateRowHeight()` or `recalculateAllRowHeights()` to reflect
   * the deletion in the row map.
   *
   * @param cellIndex The index of the cell to delete
   */
  deleteCellHeight(cellIndex: number): boolean {
    return this._cellHeights.delete(cellIndex);
  }

  /**
   * Recomputes the cached height for `row` as the max over currently
   * measured cells in that row. Removes the row entry if no cells in
   * that row are measured.
   *
   * @param row The index of the row to recalculate the height of
   */
  recalculateRowHeight(row: number): void {
    const cols = this._columnsPerRow;
    const firstCellInRow = row * cols;
    let maxHeight = 0;
    for (let col = 0; col < cols; col += 1) {
      const cellHeight = this._cellHeights.get(firstCellInRow + col);
      if (cellHeight !== undefined && cellHeight > maxHeight)
        maxHeight = cellHeight;
    }
    if (maxHeight > 0) {
      this._rowHeights.set(row, maxHeight);
    } else {
      this._rowHeights.delete(row);
    }
  }

  /**
   * Refreshes the heights of all rows, e.g., after a column-count change
   * or a resize that invalidates the existing row mapping.
   */
  recalculateAllRowHeights(): void {
    this._rowHeights.clear();
    const rowsToUpdate = new Set<number>();
    for (const cellIndex of this._cellHeights.keys()) {
      rowsToUpdate.add(Math.floor(cellIndex / this._columnsPerRow));
    }
    rowsToUpdate.forEach((r) => this.recalculateRowHeight(r));
  }

  /**
   * Updates the default row height to match the average of all currently
   * measured rows. Does nothing if no rows have been measured yet.
   */
  recalculateDefaultRowHeight(): void {
    if (this._rowHeights.size === 0) return;
    let sum = 0;
    for (const rowHeight of this._rowHeights.values()) sum += rowHeight;
    this._defaultRowHeight = sum / this._rowHeights.size;
  }

  /**
   * Drops every `cellHeights` entry whose index is `>= cutoff`. Used to
   * clean up after `itemCount` shrinks. Caller is responsible for calling
   * `recalculateAllRowHeights()` afterward to reflect the dropped cells in
   * the row height map.
   *
   * @param cutoff The index of the first cell whose height should be pruned
   */
  pruneAtOrAbove(cutoff: number): void {
    for (const index of this._cellHeights.keys()) {
      if (index >= cutoff) this._cellHeights.delete(index);
    }
  }

  /**
   * Clears all measured state (cellHeights + rowHeights) and resets the
   * placeholder-row estimate. Default row height is preserved.
   */
  clear(): void {
    this._cellHeights.clear();
    this._rowHeights.clear();
    this._placeholderRowHeight = undefined;
  }
}
