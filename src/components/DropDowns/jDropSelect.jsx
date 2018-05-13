import PropTypes from 'prop-types';
import React from 'react';

const DropdownSty = { display: 'inline-block', lineHeight: '18px', position: 'relative' };

const DropdownControlSty = {
  background: 'transparent',
  boxSizing: 'border-box',
  cursor: 'default',
  overflow: 'hidden',
  outline: 'none',
  position: 'relative',
  textAlign: 'right',
  transition: 'all 200ms ease',
  width: '100%',
};

const DropdownMenuSty = {
  backgroundColor: '#FFF',
  boxShadow: '0 1px 0 rgba(0, 0, 0, 0.06)',
  boxSizing: 'border-box',
  fontSize: '.9em',
  lineHeight: '140%',
  marginTop: '-1px',
  maxHeight: '300px',
  overflowY: 'auto',
  padding: '8px 12px',
  position: 'absolute',
  right: '0px',
  top: '100%',
  WebkitOverflowScrolling: 'touch',
  whiteSpace: 'nowrap',
  zIndex: '200',
};

const DropdownArrowSty = {
  borderColor: '#999 transparent transparent',
  borderStyle: 'solid',
  borderWidth: '5px 5px 0',
  content: "' '",
  display: 'block',
  height: '0px',
  marginTop: '-ceil(5)',
  position: 'absolute',
  right: '8px',
  top: '6px',
  width: '0px',
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

const placeSty = {
  backgroundColor: 'transparent',
  paddingRight: '20px',
};

class JDropSelect extends React.Component {
  state = { isOpen: false, selected: { label: 'Select...', value: '' } };
  componentWillMount() {
    this.setState({ selected: this.props.defaultSelected || { label: 'Select...', value: '' } });
  }
  componentWillReceiveProps(newProps) {
    if (newProps.defaultSelected && newProps.defaultSelected !== this.state.selected) {
      this.setState({ selected: newProps.defaultSelected });
    }
  }
  setValue = (e) => {
    const selectedOption = this.props.options[parseInt(e.target.id, 10)];
    if (selectedOption !== this.state.selected && this.props.onChange) this.props.onChange(this.props.itemName, selectedOption);
    this.setState({ selected: selectedOption, isOpen: false });
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
      const selected = Boolean(option.label === this.state.selected.label);
      const labelSpanSty = { cursor: 'pointer' };
      labelSpanSty.color = selected ? 'green' : 'black';
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
          <span id={index} style={labelSpanSty}>
            {option.label}
          </span>
        </div>
      );
    });

    const value = <div style={placeSty}>{this.state.selected.label}</div>;
    const menu = this.state.isOpen ? <div style={DropdownMenuSty}>{items}</div> : null;

    return (
      <div id="DropdownSty" style={DropdownSty}>
        <div
          id="DropdownControlSty"
          onKeyPress={this.handleMouseDown}
          onMouseDown={this.handleMouseDown}
          onTouchEnd={this.handleMouseDown}
          role="button"
          style={DropdownControlSty}
          tabIndex={0}
        >
          {value}
          <span id="DropdownArrowSty" style={DropdownArrowSty} />
        </div>
        {menu}
      </div>
    );
  }
}

JDropSelect.propTypes = {
  options: PropTypes.array.isRequired,
  defaultSelected: PropTypes.object.isRequired,
  itemName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

module.exports = JDropSelect;
