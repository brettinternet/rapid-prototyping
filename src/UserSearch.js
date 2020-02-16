import React from "react";
import axios from "axios";

import Results from "./Results";

export default class UserSearch extends React.Component {
  state = {
    data: [],
    error: "",
    user: {},
    searchValue: "",
    loading: false
  };

  componentDidMount() {
    const searchValue = this.props.match.params.username;
    if (searchValue) this.setState({ searchValue }, () => this.getApi());
  }

  handleOnChangeSearch = e => {
    this.setState({ searchValue: e.target.value });
  };

  submitForm = e => {
    e.preventDefault();
    return this.getApi();
  };

  getApi = () => {
    console.log("calling api...");
    const url = `https://api.github.com/users/${this.state.searchValue}`;
    this.setState({ loading: true }, () => {
      axios
        .get(url)
        .then(res =>
          this.setState({ user: res.data }, () =>
            this.getRepos(res.data.repos_url)
          )
        )
        .catch(error =>
          this.setState({ error: error.message, loading: false })
        );
    });
  };

  getRepos = url => {
    axios
      .get(url)
      .then(res =>
        this.setState({ data: res.data, loading: false }, () =>
          this.pushHistory()
        )
      )
      .catch(error => this.setState({ error: error.message, loading: false }));
  };

  pushHistory = () => {
    this.props.history.push(`/users/${this.state.searchValue}`);
  };

  render() {
    const resultsProps = {
      ...this.state,
      ...this.props
    };
    const { error, loading, data, searchValue } = this.state;
    return (
      <main className="container">
        <h1>Search</h1>
        <form className="form-group" onSubmit={this.submitForm}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">@</span>
            </div>
            <input
              type="text"
              placeholder="Username"
              className="form-control"
              onChange={this.handleOnChangeSearch}
              onKeyPress={this.handleKeyPressSearch}
              value={searchValue}
            />
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.getApi}
              >
                <i className="fa fa-search" />
              </button>
            </div>
          </div>
        </form>
        {error && <div className="alert alert-danger">{error}</div>}
        {loading && (
          <div className="alert alert-light" style={{ textAlign: "center" }}>
            loading...
          </div>
        )}
        {data.length > 0 && this.props.match.params.username && (
          <Results {...resultsProps} />
        )}
      </main>
    );
  }
}
