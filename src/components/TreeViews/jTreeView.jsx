import PropTypes from 'prop-types';
import React from 'react';
import lodashGet from 'lodash/get';

const TreeRootSty = { lineHeight: '120%' };
const liSty = { listStyleType: 'none' };
const ulSty = { height: 'inherit', WebkitPaddingStart: '16px' };
const ulStyle = { height: 'inherit', WebkitPaddingStart: '16px' };
const iconStyBase = { background: "url('./img/sun.ico') 0/16px no-repeat", marginRight: '10px', width: '16px' };

const nottogglable = {
  color: '#FFF',
  cursor: 'pointer',
  margin: '0 0 0 .8em',
};

let inOptions = {};
let inCustomColors = {};

const defaultColors = {
  parent: '#AF90A5',
  parentSelected: '#7BB53B',
  endnode: '#afac87',
  endnodeSelected: '#b58900',
};

const JTreeViewNode = (props) => {
  const iconHandler = () => {
    if (props.node.children && props.node.children.length > 0) {
      props.iconClick(props.node);
    } else {
      clickHandler();
    }
  };
  const clickHandler = () => {
    props.titleClick(props.node);
  };
  const titleColors = inCustomColors || defaultColors;
  const titleSty = { marginTop: '2px' };
  let childNodes;
  const pSty = nottogglable;

  if (props.node.children && props.node.children.length > 0) {
    childNodes = props.node.children.map(child => (
      <li key={child.nodeid} style={liSty}>
        <JTreeViewNode node={child} iconClick={props.iconClick} titleClick={props.titleClick} />
      </li>
    ));
    titleSty.color = props.node.selected ? titleColors.parentSelected : titleColors.parent;
  } else {
    titleSty.color = props.node.selected ? titleColors.endnodeSelected : titleColors.endnode;
  }

  let isClosed = true;
  if (props.node.closed != null) isClosed = props.node.closed;

  let branch = (
    <ul id="ulStyle" key={props.node.nodeid} style={ulStyle}>
      {childNodes}
    </ul>
  );
  if (isClosed) branch = null;

  const iconSty = Object.assign({}, iconStyBase);
  const iconType = lodashGet(props, inOptions.typeName);
  if (iconType === inOptions.icon.sun) iconSty.background = "url('./img/sun.ico') 0/16px no-repeat";
  else if (iconType === inOptions.icon.leaf) iconSty.background = "url('./img/leaf.ico') 0/16px no-repeat";
  else if (iconType === inOptions.icon.snow) iconSty.background = "url('./img/snow.ico') 0/16px no-repeat";
  // else iconSty.background = "url('./img/sun.ico') 0/16px no-repeat";

  return (
    <div id="TreeNode">
      <div id="pSty" style={pSty} className="FlexBox">
        <div id="iconSty" onClick={iconHandler} onKeyPress={iconHandler} role="button" style={iconSty} tabIndex={0}>
          &nbsp;
        </div>
        <div id="titleSty" onClick={clickHandler} onKeyPress={clickHandler} role="button" style={titleSty} tabIndex={0}>
          {props.node.title}
        </div>
      </div>
      {branch}
    </div>
  );
};

JTreeViewNode.propTypes = {
  node: PropTypes.object,
  iconClick: PropTypes.func,
  titleClick: PropTypes.func,
};

const JTreeView = (props) => {
  const {
    data,
    options,
    iconClick,
    titleClick,
    customColors,
  } = props;
  inOptions = options;
  inCustomColors = customColors;
  const childNodes = data.map(child => (
    <li key={child.nodeid} style={liSty}>
      <JTreeViewNode node={child} iconClick={iconClick} titleClick={titleClick} />
    </li>
  ));
  return (
    <div id="TreeRootSty" style={TreeRootSty}>
      <ul id="ulSty" key="ulRoot" style={ulSty}>
        {childNodes}
      </ul>
    </div>
  );
};

JTreeView.propTypes = {
  data: PropTypes.array,
  options: PropTypes.object,
  iconClick: PropTypes.func,
  titleClick: PropTypes.func,
  customColors: PropTypes.object,
};

module.exports = JTreeView;
