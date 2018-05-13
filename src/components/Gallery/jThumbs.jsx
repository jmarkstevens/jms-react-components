import PropTypes from 'prop-types';
import React from 'react';

import ListItem from './listitem';

const thumbColumnSty = {
  boxSizing: 'border-box',
  flexGrow: '1',
  height: '100%',
  margin: '0px',
  maxWidth: '10%',
  overflowY: 'auto',
  overflowX: 'hidden',
  padding: '0px 10px',
  textAlign: 'center',
};

const thumbRowSty = {
  maxHeight: '13vh',
  margin: '10px 0px 5px',
  overflowY: 'hidden',
  overflowX: 'auto',
  padding: '0px',
  width: '100%',
  whiteSpace: 'nowrap',
};

function listMap(item, index) {
  return (
    <ListItem key={index} item={item} index={index} selected={this.props.data.index} clickHandler={this.props.selectHandler} afterScroll={this.afterScroll} thumbColumn={this.props.thumbColumn} />
  );
}

export default class ThumbColumn extends React.Component {
  componentWillReceiveProps = () => {
    if (!this.props.hide) ReactDom.findDOMNode(this).scrollTop = 0;
  };
  afterScroll = () => {
    const thisElement = ReactDom.findDOMNode(this);
    const thisElementScrollTop = thisElement.scrollTop;
    if (thisElement.scrollHeight - thisElementScrollTop !== thisElement.clientHeight) {
      thisElement.scrollTop = thisElementScrollTop - 300;
    }
  };
  render() {
    if (this.props.hide) return null;
    const children = this.props.data.list.map(listMap, this);
    let ThumbColumnSty;
    if (this.props.thumbColumn) ThumbColumnSty = Object.assign({}, thumbColumnSty);
    else ThumbColumnSty = Object.assign({}, thumbRowSty);
    return (
      <div id="ThumbColumnSty" style={ThumbColumnSty}>
        {children}
      </div>
    );
  }
}

ThumbColumn.propTypes = {
  data: PropTypes.object,
  hide: PropTypes.bool,
  thumbColumn: PropTypes.bool,
};
