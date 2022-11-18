import { chainConfigs } from "../../utils/chainConfigs";

export default function Index() {
  return (
    <section className="body-box">
      <div style={{ maxWidth: 600, margin: "auto" }}>
        <div className="form-group">
          <label for="address">Contract Address</label>
          <input id="address" type="text" className="form-control" />
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
                  id="flexCheckChecked"
                />
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  {chainName}
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-center pt-3">
          <button className="btn btn-primary w-100">Save Information</button>
        </div>
      </div>
    </section>
  );
}
