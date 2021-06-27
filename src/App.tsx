import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import SidePanel from './components/SidePanel';
import ItemsPage from './pages/ItemsPage';
import HistoryPage from './pages/HistoryPage';
import HistoryItemPage from './pages/HistoryItemPage';
import StatisticsPage from './pages/StatisticsPage';
import './sass/App.scss';

const App = () => {
  return (
      <Router>
          <div className="main"> 
            <Header />
            <Switch>
              <Route exact path="/history/item" component={HistoryItemPage} />
              <Route path="/history" component={HistoryPage} />
              <Route path="/statistics" component={StatisticsPage} />
              <Route exact path="/" component={ItemsPage}/>
            </Switch>
            <SidePanel />
          </div>
      </Router>
  )
};

export default App;