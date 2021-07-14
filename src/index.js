import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Grid } from './grid/grid';
import { Universe } from './universe';
import { Runner } from './runner';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.runner = new Runner();

    this.speed = 2;
    this.rows = 30;
    this.cols = 50;

    this.state = {
      generation: 0,
      universe: Universe.createState(this.rows, this.cols),
      rows: this.rows,
      cols: this.cols,
      speed: this.speed,
      autoPlay: false,
    }
  }

  onSelect(id) {
    const universe = [...this.state.universe];
    universe[id] = !universe[id];

    this.setState({
      universe: universe
    });
  }

  start() {
    this.setState({
      generation: 0,
      autoPlay: true,
    });

    const tick = () => {
      this.nextStep();
    };

    this.runner.start(tick, this.state.speed);
  }

  stop() {
    this.setState({
      autoPlay: false,
    });
    this.runner.stop();
  }

  nextStep() {
    this.setState({
      generation: this.state.generation + 1,
      universe: Universe.nextStep(this.state.universe, this.state.rows, this.state.cols)
    })
  }

  render() {
    return (
      <section>
        <h1>Life</h1>
        <div className="controls">
          <button
            onClick={() => this.start()}
            disabled={this.state.autoPlay}
          >&gt; Start &gt;</button>
          <button
            onClick={() => this.stop()}
            disabled={!this.state.autoPlay}
          >X Stop X</button>
          <button
            onClick={() => this.nextStep()}
            disabled={this.state.autoPlay}
          >Step </button>
        </div>
        <Grid
          universe={this.state.universe}
          cols={this.state.cols}
          rows={this.state.rows}
          onSelect={(id) => this.onSelect(id)}
        />
        <h4>Generation: {this.state.generation}</h4>
      </section>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
);

