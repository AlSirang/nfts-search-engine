import { DashboardNav } from "../../components/DashboardNav";
import { AuthLayout } from "../../components/AuthLayout";
import { getAppCookies } from "../../middlewares/utils";
import { checkTokenAPI } from "../../services/auth";

export default function Index(props) {
  const { isAuthenticated } = props;

  return (
    <AuthLayout isAuthenticated={isAuthenticated}>
      <section className="body-box">
        <DashboardNav />
      </section>
    </AuthLayout>
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
