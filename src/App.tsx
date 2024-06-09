import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import SidePanel from "./components/SidePanel";
import ItemsPage from "./pages/ItemsPage";
import HistoryPage from "./pages/HistoryPage";
import HistoryListPage from "./pages/HistoryListPage";
import StatisticsPage from "./pages/StatisticsPage";
import "./sass/App.scss";
import { AuthRoute, ProtectedRoute } from "./util/route";
import LoginPage from "./pages/LoginPage";
import { RootState } from "./store";
import { useDispatch, useSelector } from "react-redux";
import RegisterPage from "./pages/RegisterPage";
import { fetchUser } from "./store/reducers/userSlice";
import PageLoader from "./components/PageLoader";

const App = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (user.loading) {
    return <PageLoader />;
  }
  return (
    <Router>
      <div className="main">
        {user.user_id ? <Header /> : null}
        <Routes>
          <Route
            path="/history/:id"
            element={
              <ProtectedRoute>
                <HistoryListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <HistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/statistics"
            element={
              <ProtectedRoute>
                <StatisticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <AuthRoute>
                <LoginPage />
              </AuthRoute>
            }
          />
          <Route
            path="/register"
            element={
              <AuthRoute>
                <RegisterPage />
              </AuthRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ItemsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        {user.user_id ? <SidePanel /> : null}
      </div>
    </Router>
  );
};

export default App;
