import PropTypes from 'prop-types';
import React from 'react';

const DropdownSty = { position: 'relative' };

const DropdownControlSty = {
  position: 'relative',
  overflow: 'hidden',
  background: 'transparent',
  boxSizing: 'border-box',
  cursor: 'default',
  outline: 'none',
  padding: '5px 5px',
  textAlign: 'right',
  transition: 'all 200ms ease',
  width: '100%',
};

const DropdownMenuSty = {
  backgroundColor: '#261a3b',
  boxShadow: '0 1px 0 rgba(0, 0, 0, 0.06)',
  boxSizing: 'border-box',
  fontSize: '.9em',
  lineHeight: '150%',
  marginTop: '-1px',
  maxHeight: '300px',
  overflowY: 'auto',
  padding: '8px 12px',
  position: 'absolute',
  right: '0px',
  top: '100%',
  zIndex: '200',
};

const DropdownSeperatorSty = {
  backgroundColor: '#000000',
  height: '3px',
  margin: '3px 0',
  width: '100%',
};

const DropdownOptionSty = {
  boxSizing: 'border-box',
  color: '#EEFFEE',
  cursor: 'pointer',
  display: 'block',
};

class JDropMenu extends React.Component {
  state = { isOpen: false };
  setValue = (e) => {
    const selectedOption = this.props.options[parseInt(e.target.id, 10)];
    this.props.onChange(selectedOption);
    this.setState({ isOpen: false });
  };
  handleMouseDown = (event) => {
    if (event.type === 'mousedown' && event.button !== 0) return;
    event.stopPropagation();
    event.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    const items = this.props.options.map((option, index) => {
      if (option.type === 'seperator') {
        return <div style={DropdownSeperatorSty} key={option.key} />;
      }
      return (
        <div
          id={index}
          key={option.value}
          onClick={this.setValue}
          onKeyPress={this.setValue}
          role="button"
          style={DropdownOptionSty}
          tabIndex={0}
        >
          {option.label}
        </div>
      );
    });

    const value = <i className="fa fa-bars fa-lg" />;
    const menu = this.state.isOpen ? <div style={DropdownMenuSty}>{items}</div> : null;

    return (
      <div style={DropdownSty}>
        <div style={DropdownControlSty} onKeyPress={this.handleMouseDown} onMouseDown={this.handleMouseDown} onTouchEnd={this.handleMouseDown} role="button" tabIndex={0}>
          {value}
        </div>
        {menu}
      </div>
    );
  }
}

JDropMenu.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

module.exports = JDropMenu;
