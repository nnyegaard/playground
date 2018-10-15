import React from "react";
import ReactDOM from "react-dom";
import { Bla } from "./bla/bla";

export default class App extends React.Component {
  render() {
    return (
      <>
        <div>Hello world</div>
        <Bla />
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
