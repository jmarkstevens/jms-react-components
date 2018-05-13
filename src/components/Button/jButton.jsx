import PropTypes from 'prop-types';
import React from 'react';

const standardBtnSty = {
  backgroundColor: '#9a6',
  borderBottomColor: '#cea',
  borderLeftColor: '#93a363',
  borderRightColor: '#cea',
  borderTopColor: '#93a363',
  borderRadius: '6px',
  color: '#eeffee',
  cursor: 'pointer',
  lineHeight: '100%',
  outline: 'none',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
};

const standardBtnIcon = {
  backgroundColor: 'transparent',
  backgroundImg: 'none',
  backgroundSize: 'cover',
  border: '0px',
  color: '#4d2c3d',
  cursor: 'pointer',
  height: 'inherit',
  margin: '0 3px',
  outline: 'none',
  padding: '0px',
  verticalAlign: 'middle',
  width: 'inherit',
};

function getStyle(btnProp) {
  let buttonSty = Object.assign({}, standardBtnSty);
  let btnStyle = 'Btn30';
  const isDesktop = btnProp.isDesktop ? btnProp.isDesktop : true;
  if (btnProp.btn.style) btnStyle = btnProp.btn.style;
  if (btnProp.btn.backimg && !btnProp.btn.style) btnStyle = 'BackImg';
  if (btnProp.btn.icon && !btnProp.btn.style) btnStyle = 'BtnIcon';
  if (isDesktop) {
    switch (btnStyle) {
      case 'Btn18':
        buttonSty.fontSize = '0.8em';
        buttonSty.height = '18px';
        buttonSty.margin = '0 2px';
        buttonSty.minWidth = '52px';
        buttonSty.padding = '2px';
        break;
      case 'Btn24':
        buttonSty.fontSize = '0.9em';
        buttonSty.height = '24px';
        buttonSty.margin = '0 5px';
        buttonSty.padding = '0.3em';
        break;
      case 'Btn30':
        buttonSty.fontSize = '0.9em';
        buttonSty.height = '30px';
        buttonSty.margin = '0 5px';
        buttonSty.padding = '0.45em';
        break;
      case 'Btn40':
        buttonSty.fontSize = '1.1em';
        buttonSty.height = '40px';
        buttonSty.margin = '0 5px';
        buttonSty.padding = '0.45em .8em';
        break;
      case 'BackImg': {
        buttonSty = Object.assign({}, standardBtnIcon);
        buttonSty.background = btnProp.btn.backimg;
        break;
      }
      case 'BtnIcon':
        buttonSty = standardBtnIcon;
        break;
      default: break;
    }
  } else {
    switch (btnStyle) {
      case 'Btn16':
        buttonSty.height = '24px';
        buttonSty.margin = '0 2px';
        buttonSty.padding = '0.1em 0.3em 0.3em';
        break;
      case 'Btn24':
        buttonSty.height = '30px';
        buttonSty.margin = '0 5px';
        buttonSty.padding = '0.3rem';
        break;
      case 'Btn30':
        buttonSty.fontSize = '1.1em';
        buttonSty.height = '40px';
        buttonSty.margin = '0 5px';
        buttonSty.padding = '0.45em .8em';
        break;
      case 'BtnIcon':
        buttonSty = standardBtnIcon;
        break;
      default: break;
    }
  }
  if (btnProp.btn.reStyle) buttonSty = btnProp.btn.reStyle;
  if (btnProp.btn.assignStyle) buttonSty = Object.assign({}, buttonSty, btnProp.btn.assignStyle);
  return buttonSty;
}

const JButton = (props) => {
  const clickHandler = () => {
    if (props.parentClickHandler) props.parentClickHandler(props.btn.buttonid);
  };
  const buttonSty = getStyle(props);
  const isDisabled = props.isDisabled ? props.isDisabled : false;
  let renderIt;
  if (props.btn.icon) {
    renderIt = (
      <button id={props.btn.buttonid} className="HighZ" style={buttonSty} onClick={clickHandler}>
        <i className={props.btn.icon} />
      </button>
    );
  } else {
    renderIt = (
      <button id={props.btn.buttonid} style={buttonSty} disabled={isDisabled} onClick={clickHandler}>
        {props.btn.text}
      </button>
    );
  }
  return renderIt;
};

JButton.propTypes = {
  btn: PropTypes.object.isRequired,
  isDisabled: PropTypes.bool,
  isDesktop: PropTypes.bool,
  parentClickHandler: PropTypes.func,
};

module.exports = JButton;
