import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import NavBar from "./components/NavBar";

import Home from "./views/Home"
import ActivityLogs from "./views/ActivityLogs"
import ActivityLogsNew from "./views/ActivityLogsNew";
import ActivityLogsShow from "./views/ActivityLogsShow";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

function App() {
  return (
    <div>
      <Router>
        <div>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/activity_logs">
                <ActivityLogs />
              </Route>
              <Route exact path="/activity_logs/new">
                <ActivityLogsNew />
              </Route>
              <Route path="/activity_logs/:id" component={ActivityLogsShow} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
