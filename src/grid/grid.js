import React from 'react';
import './grid.css'

export class Cell extends React.Component {
  render() {
    const className = (this.props.live) ? 'cell on' : 'cell off';
    return (
      <div
        className={className}
        onClick={() => {this.props.onSelect(this.props.id)}}
      />
    );
  }
}

export class Grid extends React.Component {

  static SIZE = 10;

  render() {

    const style = {
      width: Grid.calcDimension(this.props.cols),
      height: Grid.calcDimension(this.props.rows),
    };

    return <div
      className="grid"
      style={style}
    >
      {this.props.universe.map(((isLive, id) => <Cell key={id} id={id} live={isLive} onSelect={this.props.onSelect} />))}
    </div>;
  }

  static calcDimension(x) {
    return x * this.SIZE;
  }
}
