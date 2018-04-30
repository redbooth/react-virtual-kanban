import { PropTypes } from 'react';

export const lists = PropTypes.array;
export const width = PropTypes.number;
export const listWidth = PropTypes.number;
export const height = PropTypes.number;
export const listComponent = PropTypes.func;
export const itemComponent = PropTypes.func;
export const itemPreviewComponent = PropTypes.func;
export const listPreviewComponent = PropTypes.func;
export const onMoveRow = PropTypes.func;
export const onMoveList = PropTypes.func;
export const onDropRow = PropTypes.func;
export const onDropList = PropTypes.func;
export const onDragEndRow = PropTypes.func;
export const overscanListCount = PropTypes.number;
export const overscanRowCount = PropTypes.number;
export const scrollToCell = PropTypes.shape({
  columnIndex: PropTypes.number,
  rowIndex: PropTypes.number
}).isRequired;
export const scrollToAlignment = PropTypes.string;
export const dndDisabled = PropTypes.bool;
