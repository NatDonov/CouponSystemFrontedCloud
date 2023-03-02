import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClientType } from "../../../Models/ClientTypeModel";
import { CouponModel } from "../../../Models/CouponModel";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotificationService";
import customerWebApi from "../../../Services/WebApi/CustomerWebApi";

import webApi from "../../../Services/WebApi/CustomerWebApi";
import CouponCard from "../../SharedArea/Cards/CouponCard/CouponCard";
import MyCouponCard from "../../SharedArea/Cards/MyCouponCard/MyCouponCard";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";

import "./ShowCustomerCoupons.css";

function ShowCustomerCoupons(): JSX.Element {
  const navigate = useNavigate();

  const [coupons, setCoupons] = useState<CouponModel[]>(
    store.getState().customerReducer.customerCoupons
  );

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

  useEffect(() => {
    customerWebApi
      .getCustomerPurchaseCoupons()
      .then((res) => setCoupons(res.data))
      .catch((err) => notify.error(err));
  }, []);

  return (
    <div className="ShowCoupons">
      <h1>All purchase Coupons</h1>
      <div className="list">
        {coupons.length > 0 ? (
          coupons.map((c) => <MyCouponCard key={c.id} coupon={c} />)
        ) : (
          <EmptyView msg="No Coupons 4u" />
        )}
      </div>
    </div>
  );
}

export default ShowCustomerCoupons;
