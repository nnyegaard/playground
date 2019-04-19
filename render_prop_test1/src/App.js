import "./App.css";
import React, { Component } from "react";
import { format } from "date-fns";

class App extends Component {
  state = {
    date: "2018-10-11T11:44:14Z"
  };

  render() {
    return (
      <div className="App">
        <h1>bla</h1>
        <AuditTrailC
          render={(date, bla) => (
            <>
              <h1 />
              <b>
                <MyAuditTrail text="Hello" date={date} bla={bla} />
              </b>
            </>
          )}
        />
      </div>
    );
  }
}

class AuditTrailC extends Component {
  state = {
    date: "2018-10-11T11:44:14Z"
  };

  render() {
    return this.props.render(this.formatDate(this.state.date), this.bla());
  }

  formatDate = date => {
    console.log("we did it");

    return format(date, "ddd, D MMM YYYY HH:mm");
  };

  bla = () => {
    console.log("bla");

    return <div>blabla</div>;
  };
}

export default App;

const MyAuditTrail = ({ text, date }) => (
  <p>
    {text} {date}
  </p>
);
