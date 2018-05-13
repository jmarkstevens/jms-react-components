import PropTypes from 'prop-types';
import React from 'react';

let listSty = {};
const listStyleDefault = {};

let lineSty = {};
const lineStyleDefault = {
  color: '#a7b3a5',
  marginLeft: '7px',
};

const divMap = (item, index) => (
  <div style={lineSty} key={index}>
    {item}
  </div>
);

const spanMap = (item, index) => (
  <span style={lineSty} key={index}>
    {item}
  </span>
);

const JList = (props) => {
  const {
    data,
    lineStyle,
    listStyle,
    spanLine,
  } = props;
  listSty = listStyle || listStyleDefault;
  lineSty = lineStyle || lineStyleDefault;
  let list;
  if (spanLine) list = data.map(spanMap);
  else list = data.map(divMap);
  return (
    <div id="JListSty" style={listSty}>
      {list}
    </div>
  );
};

JList.propTypes = {
  data: PropTypes.array,
  lineStyle: PropTypes.object,
  listStyle: PropTypes.object,
  spanLine: PropTypes.string,
};

module.exports = JList;
