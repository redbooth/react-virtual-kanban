// Poor man's cache singleton. Delete me ASAP!!!
const cachedRows = new Map();

class RowSizeCache {
  constructor(rows, backend = cachedRows) {
    this.rows = rows;
    this.backend = backend;
  }

  clearAllRowHeights() {
    this.backend.clear();
  }

  clearRowHeight(index) {
    const { id } = this.rows[index];

    this.backend.delete(id);
  }

  getRowHeight(index) {
    const { id } = this.rows[index];

    return this.backend.get(id);
  }

  hasRowHeight(index) {
    const { id } = this.rows[index];

    return this.backend.has(id);
  }

  setRowHeight(index, height) {
    const { id } = this.rows[index];

    this.backend.set(id, height);
  }

  // Not implemented

  clearAllColumnWidths() {}
  clearColumnWidth(index) {}
  hasColumnWidth(index) {}
  getColumnWidth(index) {}
  setColumnWidth(index, width) {}
}

export default RowSizeCache;