import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  NavLink,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import axios from "axios";

const pathPrefix = "/rapid-prototyping";

/*
 * HOME PAGE - SEARCH *
 */
class HomePage extends Component {
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

/*
 * LIST RESULTS *
 */
function Results(props) {
  const { data, user } = props;
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>{user.login}</h3>
      <div className="row">
        <div className="col">
          <figure className="figure">
            <img
              src={user.avatar_url}
              className="figure-img img-fluid rounded"
              alt={user.name}
            />
          </figure>
        </div>
        <div className="col">
          <table className="table table-sm">
            <tbody>
              {user.name && (
                <tr>
                  <th scope="row">Name</th>
                  <td>{user.name}</td>
                </tr>
              )}
              {user.company && (
                <tr>
                  <th scope="row">Company</th>
                  <td>{user.company}</td>
                </tr>
              )}
              {user.email && (
                <tr>
                  <th scope="row">Email</th>
                  <td>{user.email}</td>
                </tr>
              )}
              {user.blog && (
                <tr>
                  <th scope="row">Site</th>
                  <td>{user.blog}</td>
                </tr>
              )}
              {user.location && (
                <tr>
                  <th scope="row">Location</th>
                  <td>{user.location}</td>
                </tr>
              )}
              {user.bio && (
                <tr>
                  <th scope="row">Bio</th>
                  <td>{user.bio}</td>
                </tr>
              )}
              {user.type === "User" && (
                <tr>
                  <th scope="row">Following</th>
                  <td>{user.following}</td>
                </tr>
              )}
              {user.type === "User" && (
                <tr>
                  <th scope="row">Followers</th>
                  <td>{user.followers}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <h4>{`${user.public_repos} Repo${
        user.public_repos !== 1 ? "s" : ""
      }`}</h4>
      {data.map(repo => (
        <div className="card mb-3" key={repo.id}>
          <div className="card-body">
            <h5 className="card-title">
              <Link to={`/repositories/${repo.name}`}>{repo.name}</Link>
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">{repo.language}</h6>
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
    </div>
  );
}

/*
 * REPOS SEARCH RESULTS *
 */
class RepoSearch extends Component {
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
    const url = `https://api.github.com/search/repositories?q=${
      this.state.reponame
    }`;
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

/*
 * APP ROUTER *
 */
class App extends Component {
  render() {
    return (
      <BrowserRouter
        basename={process.env.NODE_ENV === "production" ? pathPrefix : ""}
      >
        <div className="container">
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/users/:username" component={HomePage} />
            <Route path="/repositories/:reponame" component={RepoSearch} />
            <Route path="/about" component={AboutPage} />
            <Redirect to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

/*
 * HEADER *
 */
function Header() {
  return (
    <nav className="navbar navbar-expand-lg justify-content-end">
      <ul className="nav nav-pills">
        <li className="nav-item">
          <NavLink
            to="/"
            exact={true}
            className="nav-link"
            activeClassName="active"
          >
            Search
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about" className="nav-link" activeClassName="active">
            About
          </NavLink>
        </li>
        <li className="nav-item">
          <a
            href={`https://github.com/brettinternet/${pathPrefix}`}
            className="nav-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-github fa-2x" style={{ marginTop: "-3px" }} />
          </a>
        </li>
      </ul>
    </nav>
  );
}

/*
 * ABOUT PAGE *
 */
function AboutPage() {
  return (
    <main className="container">
      <h1>About</h1>
      <p>
        This is a boilerplate which uses <i>Create-React-App</i> and React
        Router v4 for prototyping projects quickly with Bootstrap and React.
      </p>
      <p>
        <i className="fa fa-github" style={{ marginRight: "5px" }} />
        <a href={`https://github.com/brettinternet`}>brettinternet</a> /{" "}
        <a href={`https://github.com/brettinternet/${pathPrefix}`}>fast</a>
      </p>
    </main>
  );
}

/*
 * 404 PAGE *
 * USE WITH: <Route component={NoMatch} />
 */
// function NoMatch() {
//   return (
//     <main className="container">
//       <h1>Error 404: Page not found.</h1>
//       <p>Go to the <Link to="/">Search Page</Link></p>
//     </main>
//   )
// }

export default App;
