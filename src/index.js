import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Grid } from './grid/grid';
import { Universe } from './universe';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.speed = 100;
    this.rows = 30;
    this.cols = 50;


    this.state = {
      generation: 0,
      universe: Universe.createState(this.rows, this.cols),
      rows: this.rows,
      cols: this.cols,
      speed: this.speed
    }
  }

  onSelect(id) {
    console.log('I select', id);

    const universe = [...this.state.universe];
    universe[id] = !universe[id];

    this.setState({
      universe: universe
    });
  }

  nextStep() {
    this.setState({
      universe: Universe.nextStep(this.state.universe, this.state.rows, this.state.cols)
    })
  }

  render() {
    return (
      <section>
        <h1>Life</h1>
        <div className="controls">
          <button
            onClick={() => this.nextStep()}
          >Step</button>
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

