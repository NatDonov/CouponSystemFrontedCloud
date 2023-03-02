import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loggedOut } from "../../../Redux/AuthAppState";
import { removedCompaniesAction, removedCouponsAction } from "../../../Redux/CompanyAppState";

import { removedAllCouponsAction, removedCustomerCouponAction, removedCustomersAction } from "../../../Redux/CustomerAppState";

import store from "../../../Redux/Store";
import notify, { SccMsg } from "../../../Services/NotificationService";
import "./Logout.css";

function Logout(): JSX.Element {
    const navigate = useNavigate();
    useEffect(() => {
        notify.success(SccMsg.LOGOUT_SUCCESS);
        store.dispatch(loggedOut());
        store.dispatch(removedCompaniesAction());
        store.dispatch(removedCustomersAction());
        store.dispatch(removedCouponsAction());
        store.dispatch(removedCustomerCouponAction());
        store.dispatch(removedAllCouponsAction());
        navigate('/login');
    }, []);
    return (
        <></>
    );
}

export default Logout;
