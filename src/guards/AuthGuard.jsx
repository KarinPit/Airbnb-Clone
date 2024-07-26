import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function AuthGuard({ children }) {
  const userType = useSelector(
    (storeState) => storeState.systemModule.userType
  );
  //   if (userType === "STAYER") return <Navigate to="/" />;

  //   if (userType === "RENTER") return <Navigate to="/host/homes" />;

  return <>{children}</>;
}
