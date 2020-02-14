import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { RepositoryProvider } from "./contexts/repositorycontext";
import { MenuProvider } from "./contexts/menucontext";
import { LocalizationProvider } from "./contexts/localizationcontext";
import { ShareProvider } from "./contexts/sharecontext";

export const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <RepositoryProvider>
      <LocalizationProvider>
        <MenuProvider>
          <ShareProvider>
            <App />
          </ShareProvider>
        </MenuProvider>
      </LocalizationProvider>
    </RepositoryProvider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
