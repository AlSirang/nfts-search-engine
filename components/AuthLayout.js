import { useEffect, useRef } from "react";
import Router from "next/router";

export const onAuthSuccess = () => {
  Router.push("/manage-whitelist");
};
export const onUnAuthorized = () => {
  Router.push("/manage-whitelist/auth");
};

export const AuthLayout = ({
  children,
  isAuthenticated,
  isAuthSuccessCheck = true,
}) => {
  const isComponentMounted = useRef(false);

  useEffect(() => {
    if (isComponentMounted.current) return;
    isComponentMounted.current = true;
    isAuthSuccessCheck && isAuthenticated && onAuthSuccess();

    !isAuthenticated && onUnAuthorized();
  }, [isAuthenticated, isAuthSuccessCheck]);
  return <>{children}</>;
};
