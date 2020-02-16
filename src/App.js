import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Box } from "rebass";

import Theme from "./Theme";
import Header from "./Header";
import UserSearch from "./UserSearch";
import RepoSearch from "./RepoSearch";
import About from "./About";

import config from "../package.json";
const pathPrefix = `/${config.name}`;

export default function App() {
  return (
    <BrowserRouter
      basename={process.env.NODE_ENV === "production" ? pathPrefix : ""}
    >
      <Theme>
        <Box
          mx="auto"
          sx={{
            maxWidth: "700px"
          }}
        >
          <Header />
          <Box p={2}>
            <Switch>
              <Route exact path="/" component={UserSearch} />
              <Route path="/users/:username" component={UserSearch} />
              <Route path="/repositories/:reponame" component={RepoSearch} />
              <Route path="/about" component={About} />
              <Redirect to="/" />
            </Switch>
          </Box>
        </Box>
      </Theme>
    </BrowserRouter>
  );
}
