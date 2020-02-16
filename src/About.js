import React from "react";
import config from "../package.json";

export default function About() {
  return (
    <main>
      <h1>About</h1>
      <p>
        This is a boilerplate which uses <i>Create-React-App</i> and React
        Router v4 for prototyping projects quickly with Bootstrap and React.
      </p>
      <p>
        <a href="https://brettinternet.com">brettinternet</a> /{" "}
        <a href={config.repository.url}>rapid-prototyping</a>
      </p>
    </main>
  );
}
