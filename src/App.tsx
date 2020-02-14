import React, { lazy, Suspense } from "react";
import "./style/sass/app.scss";
import Menu from "./Menu";
import { createBrowserHistory } from "history";
import { Switch, Route, Redirect } from "react-router-dom";
import { useMenu } from "./hooks/useMenu";
import NotFound from "./components/static/404";
import FullScreenLoader from "./components/static/Loader";

const PageView = lazy(() => import('./PageView'));

export const hist = createBrowserHistory();

const App = () => {
  const menucontext = useMenu()
  return (
    <>
      {menucontext ? <Menu data={menucontext} /> : null}
      <div className="container padding25 topspace">
        <div className="row">
          <div className="col-12">
            {menucontext.menuloading ? <FullScreenLoader text={"Az oldal töltődik"} /> : null}
            <Suspense fallback={<div>Page loading...</div>}>
              <Switch>
                <Route exact path="/" render={() => (<Redirect to="/main" />)} />
                {
                  menucontext ? menucontext.menuresult.map((item, index) => {
                    if(item.Isroute === false){
                      return <Route path={`/${item.Name}`} render={(props) => <PageView {...props} pagecontent={item} />} key={index} />
                    }
                  }) : null
                }
                {menucontext.menuloading === false ? <Route component={NotFound} /> : null}
              </Switch>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
