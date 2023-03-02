import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { idText } from "typescript";
import {
  deletedCompanyAction,
  deletedCouponAction,
} from "../../../Redux/CompanyAppState";
import store from "../../../Redux/Store";
import notify, { SccMsg } from "../../../Services/NotificationService";
import companyWebApi from "../../../Services/WebApi/CompanyWebApi";
import "./DeleteCoupon.css";

function DeleteCoupon(): JSX.Element {
  const params = useParams();
  const id = +(params.id || 0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = store.getState().authReducer.loginResponse.token;
    const clientType = store.getState().authReducer.loginResponse.clientType;

    if (!token) {
        navigate("/login");

    }
    if(clientType !== "COMPANY"){
        navigate("/login");
    }
}, []);

  const cancel = () => {
    navigate("/coupons");
  };

  const yes = async () => {
    await companyWebApi
      .deleteCoupon(id)
      .then((res) => {
        notify.success(SccMsg.COUPON_DELETED_SUCCESS);
        store.dispatch(deletedCouponAction(id));
        navigate("/coupons");
      })
      .catch((err) => {
        notify.error(err);
      });
  };

  return (
    <div className="DeleteCoupon col">
      <h3>Attention</h3>
      <div className="wrapper col">
        <div className="row">
          <p>Are you sure you want to delete coupon #{id} ?</p>
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

export default DeleteCoupon;
