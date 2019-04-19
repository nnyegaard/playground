import React, { Component } from "react";
import styled from "styled-components";
import "./App.css";

class App extends Component {
  state = {
    commentText: "",
    members: []
  };
  render() {
    const mentions = (
      <Mentions comment={this.state.commentText} members={this.state.members} />
    );
    return (
      <div className="App">
        <Comment>{mentions}</Comment>
      </div>
    );
  }

  componentDidMount() {
    const members = comment.mentions.map(member => {
      const name = member.name.split(" ");
      return {
        user: {
          id: member.user_id,
          first_name: name[0],
          last_name: name.slice(1, name.length),
          email: ""
        }
      };
    });

    this.setState({ commentText: comment.text, members });
  }
}

export default App;

class Mentions extends Component {
  render() {
    return <div>{this.bla()}</div>;
  }

  bla = () => {
    if (this.props.comment) {
      return <div dangerouslySetInnerHTML={this.createMarkup()} />;
    }

    return null;
  };

  createMarkup = () => {
    let _text = this.props.comment;
    const userIdPatternRegex = /@#user{\d+}/g;
    const userIdRegex = /\d+/;
    let mentions = _text.match(userIdPatternRegex);

    mentions.forEach(element => {
      const userId = parseInt(element.match(userIdRegex)[0]);
      let nameOrEmail = this.getMemberFullName(userId, this.props.members);
      _text = _text.replace(element, `<b>${nameOrEmail}</b>`);
    });

    return { __html: _text };
  };

  getMemberFullName = (id, members) => {
    let result = "";

    members.forEach(member => {
      if (member.user.id === id) {
        if (member.user.first_name) {
          result = `${member.user.first_name} ${member.user.last_name}`;
        } else {
          result = member.user.email;
        }
      }
    });

    return result;
  };
}

const comment = {
  text:
    "@#user{102} sggg @#user{102} @#user{102} more bla bla text @#user{102}",
  mentions: [
    {
      id: 57,
      name: "Nicklas Nyegaard",
      user_id: 102,
      team_id: null
    }
  ]
};

export const Comment = styled.div`
  padding: 6px 8px;
  word-wrap: break-word;
  white-space: pre-line;
  border-radius: 4px;
  border: 1px solid #dfdede;
  background-color: #ffffff;
  max-width: 25em;
  min-width: 25em;
`;
