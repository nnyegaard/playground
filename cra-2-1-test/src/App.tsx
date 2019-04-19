import { createBrowserHistory } from "history";
import React, { Component } from "react";
import { Link, Route, Router, Switch } from "react-router-dom";
import "./App.css";
import { ComponentA, ComponentC } from "./ComponentA";
// import { ComponentB } from "./ComponentB";

const ComponentB = React.lazy(() => import("./ComponentB"));

class App extends Component {
  render() {
    return (
      <Router history={createBrowserHistory()}>
        <>
          <Link to="/b">ComponentB</Link>
          <Switch>
            <Route path="/" component={ComponentA} />

            <Route path="/b" component={ComponentB} />
            <Route path="/c" component={ComponentC} />
          </Switch>
        </>
      </Router>
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.tsx</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //     Now with build in typescript support!
      //   </header>
      // </div>
    );
  }
}

export default App;
