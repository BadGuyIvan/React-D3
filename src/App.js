import React, { Component, Fragment } from 'react';
import ProgressArc from "./components/ProgressArc/ProgressArc"

class App extends Component {
  render() {
    return (
      <Fragment>
        <ProgressArc
          height={300}
          width={300}
          donut={0.7}
          cornerRadius={0.9}
          id="d3-arc"
          backgroundColor="#e6e6e6"
          foregroundColor="#00ff00"
          percentComplete={0.9}
        />
      </Fragment>
    );
  }
}

export default App;
