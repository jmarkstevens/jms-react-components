import PropTypes from 'prop-types';
import React from 'react';

const TooltipSty = {
  display: 'inline-block',
  lineHeight: '14px',
  marginRight: '5px',
  verticalAlign: 'top',
};

const helpTip = {
  background: '#5a5e5e',
  border: '1px solid #a3aaaa',
  borderRadius: '50%',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.18)',
  boxSizing: 'border-box',
  color: '#fafafa',
  cursor: 'default',
  fontSize: '11px',
  height: '14px',
  lineHeight: '14px',
  marginTop: '1px',
  textAlign: 'center',
  width: '14px',
};

const contentSty = {
  background: 'rgb(28, 34, 24)',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  borderRadius: '3px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
  color: '#e9e7da',
  fontSize: '0.9375em',
  lineHeight: '1.2em',
  maxWidth: '280px',
  minWidth: '200px',
  padding: '5px',
  textAlign: 'left',
  wordWrap: 'break-word',
  zIndex: '200',
};

const contentOuterSty = { height: '100%', width: '100%' };

const Contents = (props) => {
  const {
    tooltipActive,
    place,
    position,
    data,
  } = props;
  if (!data) return null;
  const contentHtml = data;
  const contentLength = contentHtml.length;
  const topNeg = (Math.ceil(contentLength / 40) + 1) * 18;
  const rightNeg = contentLength * 0.25;

  const active = tooltipActive;
  const inPosition = position || null;
  const contentInnerSty = { position: 'absolute' };
  if (active) {
    switch (place) {
      case 'bottom':
        contentInnerSty.left = inPosition.right + 5;
        contentInnerSty.top = inPosition.top + 20;
        break;
      case 'right':
        contentInnerSty.left = inPosition.right + 5;
        contentInnerSty.top = inPosition.top - rightNeg;
        break;
      case 'top':
        contentInnerSty.left = inPosition.right + 5;
        contentInnerSty.top = inPosition.top - topNeg;
        break;
      default: break;
    }
  } else contentInnerSty.display = 'none';
  const displayContent = { __html: contentHtml };
  return (
    <div id="contentOuterSty" style={contentOuterSty}>
      <div id="contentInnerSty" style={contentInnerSty}>
        <div id="contentSty" style={contentSty}>
          <div dangerouslySetInnerHTML={displayContent} />
        </div>
      </div>
    </div>
  );
};

Contents.propTypes = {
  tooltipActive: PropTypes.bool,
  place: PropTypes.string,
  position: PropTypes.object,
  data: PropTypes.string,
};

class JTooltip extends React.Component {
  state = { tooltipActive: false, position: {} };
  onMouseEnter = () => {
    const rect = this.TooltipRef.getBoundingClientRect();
    const position = {};
    position.left = rect.left - this.props.adjust.left;
    position.top = rect.top - this.props.adjust.top;
    position.right = rect.right - this.props.adjust.left;
    position.bottom = rect.bottom - this.props.adjust.top;
    this.setState({ tooltipActive: true, position });
  };
  onMouseLeave = () => {
    this.setState({ tooltipActive: false });
  };
  render() {
    const help = '?';
    return (
      <div
        id="TooltipSty"
        ref={(ref) => {
          this.TooltipRef = ref;
        }}
        style={TooltipSty}
      >
        <div id="events" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
          <div id="helpTip" style={helpTip}>
            {help}
          </div>
        </div>
        <Contents tooltipActive={this.state.tooltipActive} place={this.props.place} position={this.state.position} data={this.props.data} />
      </div>
    );
  }
}

JTooltip.propTypes = {
  adjust: PropTypes.object,
  data: PropTypes.string,
  place: PropTypes.string,
};

module.exports = JTooltip;
