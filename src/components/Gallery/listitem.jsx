import PropTypes from 'prop-types';
import React from 'react';

const ThumbColumnItemSty = {
  background: 'transparent',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  marginBottom: '10px',
  marginRight: 'auto',
  marginLeft: 'auto',
  textAlign: 'center',
  width: 'calc(100% - 4px)',
};

const ThumbRowItemSty = {
  background: 'transparent',
  display: 'inline-block',
  verticalAlign: 'middle',
};

const thumbImageSty = {
  display: 'block',
  marginRight: 'auto',
  marginLeft: 'auto',
  maxWidth: 'calc(100% - 6px)',
  maxHeight: 'calc(13vh - 41px)',
  width: 'auto',
  height: 'auto',
};

export default class ListItem extends React.Component {
  componentDidUpdate = () => {
    if (this.props.index === this.props.selected) {
      this.refName.scrollIntoView({ behavior: 'smooth' });
      this.props.afterScroll();
    }
  };
  clickHandler = () => {
    this.props.clickHandler(this.props.index);
  };
  render() {
    let thumbColumnImgBorder;
    if (this.props.index === this.props.selected) thumbColumnImgBorder = '3px solid rgb(220, 112, 24)';
    else thumbColumnImgBorder = '3px solid transparent';

    let ThumbDivSty;
    if (this.props.thumbColumn) ThumbDivSty = Object.assign({}, ThumbColumnItemSty);
    else ThumbDivSty = Object.assign({}, ThumbRowItemSty);
    // ThumbDivSty.backgroundImage = 'url(' + src + ')';
    const ThumbImgSty = Object.assign({}, thumbImageSty);
    ThumbImgSty.border = thumbColumnImgBorder;
    const src = this.props.item.smFolder + this.props.item.FileName;
    return (
      <div
        id="ThumbColumnItemSty"
        ref={(ref) => {
          this.refName = ref;
        }}
        style={ThumbDivSty}
      >
        <img
          id="ThumbColumnImgSty"
          alt="thumbnail"
          src={src}
          onClick={this.clickHandler}
          onKeyPress={this.clickHandler}
          role="button"
          style={ThumbImgSty}
          tabIndex={0}
        />
      </div>
    );
  }
}

ListItem.propTypes = {
  index: PropTypes.number,
  selected: PropTypes.number,
  clickHandler: PropTypes.func,
  afterScroll: PropTypes.func,
  thumbColumn: PropTypes.bool,
  item: PropTypes.object,
};
