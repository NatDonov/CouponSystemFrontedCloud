import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadConfetiAction, purchasedCouponAction } from "../../../Redux/CustomerAppState";
import store from "../../../Redux/Store";
import notify, { SccMsg } from "../../../Services/NotificationService";
import customerWebApi from "../../../Services/WebApi/CustomerWebApi";
import "./PurchaseCoupon.css";

function PurchaseCoupon(): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const id = +(params.id || 0);
  const couponToPurch = store.getState()?.customerReducer?.coupons?.find((coupon) => coupon?.id === id);


  useEffect(() => {
    const token = store.getState().authReducer.loginResponse.token;
    const clientType = store.getState().authReducer.loginResponse.clientType;

    if (!token) {
      navigate("/login");

    }
    if (clientType !== "CUSTOMER") {
      navigate("/login");
    }
  }, []);

  const yes = () => {
    store.dispatch(loadConfetiAction(true));
    setTimeout(() => {
      store.dispatch(loadConfetiAction(false));
    }, 5_000);
    customerWebApi
      .purchaseCoupon(couponToPurch)
      .then((res) => {
        notify.success(SccMsg.COUPON_PURCHASE_SUCCESS);
        store.dispatch(purchasedCouponAction(id));
        navigate("/customer/coupons");
      })
      .catch((err) => {
        notify.error(err);
      });
  };

  const no = () => {
    navigate("/customer/coupons");
  };

  return (
    <div className="PurchaseCoupon col">
      <h2>Purchase Coupon</h2>
      <h3>Attention</h3>
      <div className="wrapper col">
        <div className="row">
          <p>Are you sure you want to buy this coupon #{id} ?</p>
        </div>
        <div className="row gap">
          <button className="no" onClick={no}>
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

export default PurchaseCoupon;
