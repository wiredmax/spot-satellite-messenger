var React = require("react")
var {DefaultRoute, NotFoundRoute, Route} = require("react-router")

module.exports = [
  <Route name="app" path="/" handler={require("./components/App.jsx")}>
    <Route name="about" handler={require("./components/About.jsx")} />
    <DefaultRoute name="home" handler={require("./components/Home.jsx")} />
  </Route>
]
