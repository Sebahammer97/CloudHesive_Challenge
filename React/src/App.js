import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";

// Routes
import { Home, CreatePostcard, ViewPostcard } from "./routes/index";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/postcard/create" component={CreatePostcard} />
        <Route path="/postcard/view/:id" component={ViewPostcard} />
      </Switch>
    </Router>
  );
}

export default App;
