import PropTypes from 'prop-types';
import React from 'react';

const ShortcutsSty = {
  backgroundColor: '#333',
  border: '1px solid green',
  color: '#AAA',
  left: '10px',
  padding: '10px',
  position: 'absolute',
  top: '50px',
};

const headSty = {
  color: '#e2d290',
  fontSize: '1.2em',
  textAlign: 'center',
};

const keySty = {
  color: '#aaa',
  fontSize: '1em',
  textAlign: 'center',
  width: '30px',
};

const descSty = {
  color: '#aaa',
  fontSize: '1em',
  textAlign: 'left',
};

const okSty = {
  backgroundColor: '#222',
  cursor: 'pointer',
  padding: '5px 0px',
  textAlign: 'center',
  width: '100%',
};

export default class Shortcuts extends React.Component {
  closeHandler = () => {
    this.props.closeHandler();
  };
  render() {
    if (this.props.hide) return null;
    return (
      <div id="Shortcuts" className="HighZ" style={ShortcutsSty}>
        <div style={headSty}>Keyboard Shortcuts</div>
        <br />
        <div className="FlexBox">
          <div style={keySty}>
            &rarr;<br />
            &larr;<br />
            T<br />
            B<br />
            S<br />
            X<br />
          </div>
          <div style={descSty}>
            Next pic<br />
            Previous pic<br />
            Side Thumbs<br />
            Bottom Thumbs<br />
            Full screen<br />
            Exit<br />
          </div>
        </div>
        <br />
        <div style={okSty} onClick={this.closeHandler} onKeyPress={this.closeHandler} role="button" tabIndex={0}>
          Ok
        </div>
      </div>
    );
  }
}

Shortcuts.propTypes = {
  closeHandler: PropTypes.func,
  hide: PropTypes.bool,
};
