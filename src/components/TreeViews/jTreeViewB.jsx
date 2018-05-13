import PropTypes from 'prop-types';
import React from 'react';
import lodashGet from 'lodash/get';

const TreeRootSty = { lineHeight: '21px' };
const liSty = { listStyleType: 'none' };
const ulSty = { WebkitPaddingStart: '16px' };
const ulStyle = { WebkitPaddingStart: '16px' };
const iconStyBase = {
  background: "url('./img/sun.ico') 0/16px no-repeat",
  height: '21px',
  marginRight: '10px',
  width: '16px',
};

const nottogglable = {
  color: '#FFF',
  cursor: 'pointer',
  margin: '0 0 0 12px',
};

const togglable = {
  color: '#815C7C',
  cursor: 'pointer',
  margin: '0px',
};

let inOptions = {};
let inCustomColors = {};

const defaultColors = {
  parent: '#AF90A5',
  parentSelected: '#7BB53B',
  endnode: '#afac87',
  endnodeSelected: '#b58900',
};

class JTreeViewBNode extends React.Component {
  static propTypes = {
    node: PropTypes.object,
    titleClick: PropTypes.func,
  }
  state = { visible: false };
  iconHandler = () => {
    if (this.props.node.children && this.props.node.children.length > 0) {
      this.setState({ visible: !this.state.visible });
    } else {
      this.props.titleClick(this.props.node);
    }
  };
  clickHandler = () => {
    this.props.titleClick(this.props.node);
  };
  render() {
    const titleColors = inCustomColors || defaultColors;
    const titleSty = { marginTop: '2px' };
    let childNodes;
    let pSty = nottogglable;
    if (this.props.node.children && this.props.node.children.length > 0) {
      childNodes = this.props.node.children.map(child => (
        <li key={child.filename} style={liSty}>
          <JTreeViewBNode node={child} titleClick={this.props.titleClick} />
        </li>
      ));
      pSty = togglable;
      titleSty.color = this.props.node.selected ? titleColors.parentSelected : titleColors.parent;
    } else {
      titleSty.color = this.props.node.selected ? titleColors.endnodeSelected : titleColors.endnode;
    }

    let branch = null;
    if (this.state.visible) {
      branch = (
        <ul id="ulStyle" key={this.props.node.filename} style={ulStyle}>
          {childNodes}
        </ul>
      );
    }

    const iconSty = Object.assign({}, iconStyBase);
    const iconType = lodashGet(this.props, inOptions.typeName);
    if (iconType === inOptions.icon.sun) iconSty.background = "url('./img/sun.ico') 0/16px no-repeat";
    else if (iconType === inOptions.icon.leaf) iconSty.background = "url('./img/leaf.ico') 0/16px no-repeat";
    else if (iconType === inOptions.icon.snow) iconSty.background = "url('./img/snow.ico') 0/16px no-repeat";
    // else iconSty.background = "url('./img/sun.ico') 0/16px no-repeat";

    const titleName = this.props.node.title;

    return (
      <div id="TreeNode">
        <div id="pSty" style={pSty} className="FlexBox">
          <div id="iconSty" onClick={this.iconHandler} onKeyPress={this.iconHandler} role="button" style={iconSty} tabIndex={0}>
            &nbsp;
          </div>
          <div id="titleSty" onClick={this.clickHandler} onKeyPress={this.clickHandler} role="button" style={titleSty} tabIndex={0}>
            {titleName}
          </div>
        </div>
        {branch}
      </div>
    );
  }
}

const JTreeViewB = (props) => {
  const {
    data,
    options,
    titleClick,
    customColors,
  } = props;
  inOptions = options;
  inCustomColors = customColors;
  const childNodes = data.map(child => (
    <li key={child.title} style={liSty}>
      <JTreeViewBNode node={child} titleClick={titleClick} />
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

JTreeViewB.propTypes = {
  data: PropTypes.array,
  options: PropTypes.object,
  titleClick: PropTypes.func,
  customColors: PropTypes.object,
};

module.exports = JTreeViewB;
