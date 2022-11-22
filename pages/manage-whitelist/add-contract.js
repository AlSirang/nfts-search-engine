import { useRef, useState } from "react";
import Web3 from "web3";

import { AuthLayout } from "../../components/AuthLayout";
import { DashboardNav } from "../../components/DashboardNav";
import { getAppCookies } from "../../middlewares/utils";
import { addContractAPI, checkTokenAPI } from "../../services/auth";
import { chainConfigs } from "../../utils/chainConfigs";

export default function Index(props) {
  const { isAuthenticated } = props;

  const [{ inputError, checkBoxError }, setFieldError] = useState({
    inputError: null,
    checkBoxError: null,
  });

  const inputValue = useRef("");
  const onInputChange = (e) => {
    inputValue.current = e.target.value;
  };

  const deployedChainIds = useRef([]);
  const onCheckBoxChange = (e, xyz) => {
    const { value, checked } = e.target;
    if (checked) return deployedChainIds.current.push(value);
    deployedChainIds.current = deployedChainIds.current.filter(
      (chainId) => chainId !== value
    );
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const web3 = new Web3();
    let areInputsValid = true;

    setFieldError({
      inputError: null,
      checkBoxError: null,
    });

    if (deployedChainIds.current.length == 0) {
      areInputsValid = false;
      setFieldError((prev) => ({
        ...prev,
        checkBoxError: "Please select a chain",
      }));
    }

    if (!web3.utils.isAddress(inputValue.current.toLowerCase())) {
      areInputsValid = false;
      setFieldError((prev) => ({
        ...prev,
        checkBoxError: "Please enter a valid ethereum address",
      }));
    }

    if (!areInputsValid) return;

    try {
      const payload = {
        address: inputValue.current,
        deployedChainIds: deployedChainIds.current,
      };
      const { data } = await addContractAPI(payload);
    } catch (err) {}
  };
  return (
    <AuthLayout isAuthenticated={isAuthenticated} isAuthSuccessCheck={false}>
      <section className="body-box">
        <DashboardNav />

        <form onSubmit={onFormSubmit}>
          <div style={{ maxWidth: 600, margin: "auto" }}>
            <div className="form-group">
              <label htmlFor="address">Contract Address</label>
              <input
                id="address"
                type="text"
                className="form-control"
                onChange={onInputChange}
                required
              />
            </div>

            <div className="py-2">
              <p className="m-0">Select Deployed Networks</p>
            </div>

            <div className="row">
              {chainConfigs.map(({ chainName, chainId }) => (
                <div key={chainId} className="col-md-6 col-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={chainId}
                      id={chainId}
                      onChange={onCheckBoxChange}
                    />
                    <label className="form-check-label" htmlFor={chainId}>
                      {chainName}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-center pt-3">
              <button
                className="btn btn-primary w-100 button-round"
                type="submit"
              >
                Save Information
              </button>
            </div>
          </div>
        </form>
      </section>
    </AuthLayout>
  );
}

export async function getServerSideProps(context) {
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
}
