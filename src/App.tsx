import React from "react";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import SidePanel from './components/SidePanel';
import ItemsPage from './pages/ItemsPage';
import './sass/App.scss';

const App = () => {
  return (
      <Router>
          <div className="main"> 
            <Header />
            <Switch>
              <Route path="/" component={ItemsPage}/>
              {/* <Route path="/breeds/:breedId" component={} />
              <Route path="/about" component={} />
              <Route exact path="/" component={} /> */}
            </Switch>
            <SidePanel />
          </div>
      </Router>
  )
};

export default App;