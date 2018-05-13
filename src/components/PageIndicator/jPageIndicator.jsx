import PropTypes from 'prop-types';
import React from 'react';

const styles = {
  component: {
    textAlign: 'center',
    padding: '0',
  },
  dot: {
    width: 9,
    height: 9,
    margin: 7,
    padding: 0,
    borderRadius: '100%',
    display: 'inline-block',
    verticalAlign: 'middle',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  dotActive: {
    backgroundColor: '#b4dbc0',
  },
};

const PageIndicator = (props) => {
  const _handleDotClick = (e) => {
    if (props.onClick) props.onClick(parseInt(e.target.id, 10));
  };

  const _renderDots = () => {
    const dots = [];

    for (let i = 0; i < props.count; i += 1) {
      const dotStyles = props.activeIndex === i ? Object.assign({}, styles.dot, styles.dotActive) : styles.dot;
      const ele = (
        <span
          key={`dot${i}`}
          id={i}
          onClick={_handleDotClick}
          onKeyPress={_handleDotClick}
          role="button"
          style={dotStyles}
          tabIndex={0}
        />
      );
      dots.push(ele);
    }
    return dots;
  };

  const renderedDots = _renderDots();

  return <div style={styles.component}>{renderedDots}</div>;
};

PageIndicator.propTypes = {
  activeIndex: PropTypes.number,
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

module.exports = PageIndicator;
