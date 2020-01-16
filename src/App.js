import { createBrowserHistory } from "history";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import GlobalStyle from "./styles/global";

function App() {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/quiz/:id" component={Quiz} />
        <Route exact path="/result" component={Result} />
      </Switch>
    </Router>
  );
}

export default App;
