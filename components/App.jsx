import React from "react";
import {Link, RouteHandler} from "react-router";

const App = React.createClass({
  render: function() {
    return (
      <div>
        <header>
          <ul>
            <li><Link to="home">Home</Link></li>
            <li><Link to="about">About</Link></li>
          </ul>
        </header>

        <RouteHandler />
      </div>
    );
  }
});

module.exports = App;
