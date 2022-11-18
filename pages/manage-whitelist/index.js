import { useEffect, useRef } from "react";
import Router from "next/router";
import { getAppCookies } from "../../middlewares/utils";
import { checkTokenAPI } from "../../services/auth";
import Link from "next/link";

export default function Index(props) {
  const onUnAuthorized = () => {
    Router.push("/manage-whitelist/auth");
  };

  const isComponentMounted = useRef(false);

  const { isAuthenticated } = props;
  useEffect(() => {
    if (isComponentMounted.current) return;
    isComponentMounted.current = true;
    !isAuthenticated && onUnAuthorized();
  }, [isAuthenticated]);
  return (
    <section className="body-box">
      <h2>welcome</h2>

      <Link href="/manage-whitelist/add-contract">Add Contract</Link>
    </section>
  );
}

export const getServerSideProps = async (context) => {
  const { dynaswapToken } = getAppCookies(context.req);

  let user = {};
  let isAuthenticated = false;

  if (dynaswapToken) {
    try {
      const res = await checkTokenAPI(dynaswapToken);
      user = res.data;
      isAuthenticated = true;
    } catch (err) {}
  }
  return {
    props: {
      user,
      isAuthenticated,
    },
  };
};
