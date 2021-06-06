import React from "react";

import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = { color: "red" };
  }
  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}

export default App;
