import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class RepoSearch extends React.Component {
  state = {
    reponame: "",
    loading: false,
    error: "",
    data: [],
    total: 0
  };

  componentDidMount() {
    const reponame = this.props.match.params.reponame;
    if (reponame) this.setState({ reponame }, () => this.getReposList());
  }

  getReposList = () => {
    console.log("calling api...");
    const url = `https://api.github.com/search/repositories?q=${this.state.reponame}`;
    this.setState({ loading: true }, () => {
      axios
        .get(url)
        .then(res => {
          const data =
            res.data.items.length > 20
              ? res.data.items.slice(0, 20)
              : res.data.items;
          this.setState({ data, total: res.data.total_count, loading: false });
        })
        .catch(error =>
          this.setState({ error: error.message, loading: false })
        );
    });
  };

  pushHistoryBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { total, data, loading, error, reponame } = this.state;
    return (
      <div>
        <button className="btn btn-light mb-2" onClick={this.pushHistoryBack}>
          <span className="fa fa-caret-left"> Back</span>
        </button>
        <h3 style={{ textAlign: "center" }}>{reponame}</h3>
        <h4>{`${total} Repo${total !== 1 ? "s" : ""}`}</h4>
        {!loading &&
          data.map(repo => (
            <div className="card mb-3" key={repo.id}>
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/users/${repo.owner.login}`}>
                    {repo.owner.login}
                  </Link>{" "}
                  /{" "}
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {repo.language}
                </h6>
                <p className="card-text">{repo.description}</p>
                <div className="row">
                  <div className="col-sm text-muted">
                    Created{" "}
                    {`${new Date(repo.created_at).getMonth() + 1}-${new Date(
                      repo.created_at
                    ).getFullYear()}`}
                  </div>
                  <div className="col-sm text-muted">
                    Updated{" "}
                    {`${new Date(repo.updated_at).getMonth() + 1}-${new Date(
                      repo.updated_at
                    ).getFullYear()}`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        {error && <div className="alert alert-danger">{error}</div>}
        {loading && (
          <div className="alert alert-light" style={{ textAlign: "center" }}>
            loading...
          </div>
        )}
      </div>
    );
  }
}
