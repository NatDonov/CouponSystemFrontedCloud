import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletedCompanyAction } from "../../../Redux/CompanyAppState";
import store from "../../../Redux/Store";
import notify, { SccMsg } from "../../../Services/NotificationService";
import adminWebApi from "../../../Services/WebApi/AdminWebApi";
import "./DeleteCompany.css";

function DeleteCompany(): JSX.Element {
  const params = useParams();
  const id = +(params.id || 0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = store.getState().authReducer.loginResponse.token;
    const clientType = store.getState().authReducer.loginResponse.clientType;

    if (!token) {
        navigate("/login");

    }
    if(clientType !== "ADMINISTRATOR"){
        navigate("/login");
    }
}, []);

  const cancel = () => {
    navigate("/companies");
  };

  const yes = async () => {
    await adminWebApi
      .deleteCompany(id)
      .then((res) => {
        notify.success(SccMsg.COMPANY_DELETE_SUCCESS);
        store.dispatch(deletedCompanyAction(id));
        navigate("/companies");
      })
      .catch((err) => {
        notify.error(err);
      });
  };
  return (
    <div className="DeleteCompany col">
      <h3>Attention</h3>
      <div className="wrapper col">
        <div className="row">
          <p>Are you sure you want to delete company #{id} ?</p>
        </div>
        <div className="row gap">
          <button className="cancel" onClick={cancel}>
            Cancel
          </button>
          <button className="yes" onClick={yes}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCompany;
