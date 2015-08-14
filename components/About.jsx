import React from "react";

const About = React.createClass({
  render: function() {
    return (
      <div>{typeof(window) === "undefined" ? "server" : "client"}</div>
    );
  }
});

module.exports = About;
