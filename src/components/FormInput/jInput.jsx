import PropTypes from 'prop-types';
import React from 'react';

class JInput extends React.Component {
  state = { textValue: '' };

  componentDidMount = () => {
    if (this.props.input.textValue) this.setState({ textValue: this.props.input.textValue });
    if (this.props.input.focus) this.inputRef.focus();
  };
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.input.textValue && this.state.textValue !== nextProps.input.textValue) {
      this.setState({ textValue: nextProps.input.textValue });
    }
  };

  handleCheckedChange = (event) => {
    this.props.handleChange(this.props.input.name, event.target.checked);
  };
  handleTextValueChange = (event) => {
    const newValue = event.target.value;
    this.setState({ textValue: newValue });
    this.props.handleChange(this.props.input.name, newValue);
  };
  handleValueChange = (event) => {
    this.props.handleChange(this.props.input.name, event.target.value);
  };
  handleFolderChange = (event) => {
    this.props.handleChange(this.props.input.name, event.target.value);
  };
  render() {
    const inputSty = this.props.input.style || { color: '#4d2c3d' };
    const inputType = this.props.input.type || 'text';
    let returnIt = '';

    switch (inputType) {
      case 'checkbox': {
        const checkedValue = this.props.input.checkedValue != null ? this.props.input.checkedValue : false;
        returnIt = (
          <input
            ref={(ref) => {
              this.inputRef = ref;
            }}
            type={inputType}
            style={inputSty}
            checked={checkedValue}
            onChange={this.handleCheckedChange}
          />
        );
        break;
      }
      case 'radio': {
        const radioValue = this.props.input.radioValue || '';
        const radioChecked = this.props.input.radioChecked != null ? this.props.input.radioChecked : false;
        returnIt = (
          <input
            ref={(ref) => {
              this.inputRef = ref;
            }}
            type={inputType}
            style={inputSty}
            checked={radioChecked}
            value={radioValue}
            onChange={this.handleValueChange}
          />
        );
        break;
      }
      case 'color': {
        const colorValue = this.props.input.colorValue || '#1A3212';
        returnIt = (
          <input
            type={inputType}
            ref={(ref) => {
              this.inputRef = ref;
            }}
            style={inputSty}
            value={colorValue}
            onChange={this.handleValueChange}
          />
        );
        break;
      }
      case 'number':
      case 'range': {
        const numberValue = this.props.input.numberValue || 0;
        const min = this.props.input.min || 0;
        const max = this.props.input.max || 100;
        const step = this.props.input.step || 1;
        returnIt = (
          <input
            type={inputType}
            ref={(ref) => {
              this.inputRef = ref;
            }}
            style={inputSty}
            value={numberValue}
            min={min}
            max={max}
            step={step}
            onChange={this.handleValueChange}
          />
        );
        break;
      }
      case 'file': {
        returnIt = (
          <input
            type={inputType}
            ref={(ref) => {
              this.inputRef = ref;
            }}
            style={inputSty}
            onChange={this.handleFolderChange}
            multiple
          />
        );
        break;
      }
      default: {
        const { textValue } = this.state;
        returnIt = (
          <input
            type={inputType}
            ref={(ref) => {
              this.inputRef = ref;
            }}
            style={inputSty}
            value={textValue}
            onChange={this.handleTextValueChange}
          />
        );
        break;
      }
    }

    return returnIt;
  }
}

JInput.propTypes = {
  input: PropTypes.object,
  handleChange: PropTypes.func,
};

module.exports = JInput;
