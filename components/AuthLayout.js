import { useEffect, useRef } from "react";
import Router from "next/router";

export const AuthLayout = ({ isAuthenticated, children }) => {
  const isComponentMounted = useRef(false);

  const onAuthSuccess = () => {
    Router.push("/manage-whitelist");
  };
  const onUnAuthorized = () => {
    Router.push("/manage-whitelist/auth");
  };

  useEffect(() => {
    if (isComponentMounted.current) return;
    isComponentMounted.current = true;
    isAuthenticated && onAuthSuccess();

    !isAuthenticated && onUnAuthorized();
  }, [isAuthenticated]);
  return <>{children}</>;
};
