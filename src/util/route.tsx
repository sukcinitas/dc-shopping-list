import React, { JSX } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Navigate } from "react-router";

const Auth = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useSelector((state: RootState) => ({
    isLoggedIn: Boolean(state.user.user_id),
  }));
  if (isLoggedIn) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

const Protected = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useSelector((state: RootState) => ({
    isLoggedIn: Boolean(state.user.user_id),
  }));
  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export const AuthRoute = Auth;

export const ProtectedRoute = Protected;
