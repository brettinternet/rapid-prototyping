# Rapid prototyping web projects

[![Build Status](https://travis-ci.org/brettinternet/rapid-prototyping.svg?branch=master)](https://travis-ci.org/brettinternet/rapid-prototyping)

This is an SPA boilerplate using Create React App and with rapid configuration. A practical use case is for a timed coding assignment as part of an interview.

### Features

- [x] [Create-react-app](https://github.com/facebook/create-react-app)
- [x] [React-router-dom](https://reacttraining.com/react-router/web/guides/philosophy)
- [x] [Boostrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
- [x] [Font-awesome](https://fontawesome.com/icons)
- [x] [Axios](https://github.com/axios/axios)
- [x] simple API call + routing

### Src

I've put all the components in `App.js` for speed coding.

- All routes are contained in `App` component.
- `Header` and `About` are functional components below the `App` component.
- `HomePage` or the root view is at the top, with two components that list views below.
- `Results` component lists all the user's repositories on the `HomePage`.
- `RepoSearch` is a separate view that lists repos with a similar name when a repo is selected from the `Results`.
- A 404 currently redirects to the root view. See the very bottom of `App.js` to add a 404 route.

### Setup

To set up from scratch:

```sh
npx create-react-app <project_name>
```

```sh
yarn add react-router-dom axios bootstrap font-awesome
```

Add to `index.js`:

```
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
```

### Deploy to GitHub Pages

`<BrowserRouter>` needs to interperet.
This is necessary to [make create-react-app work with GitHub Pages](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#building-for-relative-paths).

Add to `package.json`:

```json
  "homepage": ".",
```

Set `pathPrefix` in `App.js` with the git project name

```js
const pathPrefix = "/rapid-prototyping";
```

Run

```sh
yarn run deploy
```
