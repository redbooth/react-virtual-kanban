import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { List as VirtualScroll, CellMeasurer, AutoSizer } from 'react-virtualized';
import { DragSource, DropTarget } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import RowSizeCache from '../utils/RowSizeCache';
import SortableItem from '../SortableItem';

import { LIST_TYPE, ROW_TYPE } from '../types';
import * as dragSpec from './dragSpec';
import * as dropSpec from './dropSpec';

import './styles/index.css';

class List extends Component {
  static propTypes = {
    rows: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
    listId: PropTypes.string,
    listIndex: PropTypes.number,
    listComponent: PropTypes.func,
    itemComponent: PropTypes.func,
    moveRow: PropTypes.func,
    moveList: PropTypes.func,
  };

  static defaultProps = {
    width: 200,
    height: 280,
    rowHeight: 62,
  };

  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.renderRowForMeasure = this.renderRowForMeasure.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true
    });
  }

  componentDidUpdate(prevProps) {
    if(this.props.isDragging) return;
    if (prevProps.rows === this.props.rows) return;
    this._list.recomputeRowHeights();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  renderRow({ index, key, style }) {
    const row = this.props.rows[index];

    return (
      <SortableItem
        key={key}
        rowStyle={style}
        index={index}
        listIndex={this.props.listIndex}
        itemComponent={this.props.itemComponent}
        row={row}
        moveRow={this.props.moveRow}
      />
    );
  }

  renderRowForMeasure({ rowIndex: index }) {
    const { itemComponent: DecoratedItem } = this.props;
    const row = this.props.rows[index];

    // TODO: Determine whether scrollbar is visible or not :/
    // const width = this.props.width;

    return (
      <DecoratedItem
        row={row}
        connectDragSource={(e) => e}
        connectDropTarget={(e) => e}
        isDragging={false}
      />
    );
  }

  renderList() {
    return (
      <AutoSizer>
        {({ width, height }) => (
          <CellMeasurer
            width={width}
            columnCount={1}
            rowCount={this.props.rows.length}
            cellRenderer={this.renderRowForMeasure}
            cellSizeCache={new RowSizeCache(this.props.rows)}
          >
            {({ getRowHeight }) => (
              <VirtualScroll
                ref={(c) => (this._list = c)}
                className='KanbanList'
                width={width}
                height={height}
                rowHeight={getRowHeight}
                rowCount={this.props.rows.length}
                rowRenderer={this.renderRow}
                overscanRowCount={2}
               />
             )}
          </CellMeasurer>
        )}
      </AutoSizer>
    );
  }

  render() {
    const { listId, listComponent: DecoratedList, isDragging, connectDragSource, connectDropTarget, style } = this.props;

    return (
      <DecoratedList
        listId={listId}
        style={style}
        isDragging={isDragging}
        connectDragSource={connectDragSource}
        connectDropTarget={connectDropTarget}
      >
        {this.renderList()}
      </DecoratedList>
    );
  }
}

const connectDrop = DropTarget([LIST_TYPE, ROW_TYPE], dropSpec, connect => ({
  connectDropTarget: connect.dropTarget(),
}))

const connectDrag = DragSource(LIST_TYPE, dragSpec, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
}))

export default connectDrop(connectDrag(List));
