import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import store from "../../../Redux/Store";
import "./Menu.css";

function Menu(): JSX.Element {
  const [userClientType, setUserClientType] = useState<string>(store.getState().authReducer.loginResponse.clientType);
  useEffect(() => {
    return store.subscribe(() => {
      setUserClientType(store.getState().authReducer.loginResponse.clientType);
    });
  }, []);
  return (
    <div className="Menu">
      <Link to={"home"}>Home</Link>
      <Link to={"about"}>About</Link>
      <Link to={"developer"}>Developer</Link>

      {userClientType === "ADMINISTRATOR" && 
      <>
      <Link to={"/companies"}>Companies</Link>
      {/* <Link to={"/companies/add"}>Add Company</Link> */}
      <Link to={"/customers"}>Customers</Link>
      {/* <Link to={"/customers/add"}>Add Customers</Link> */}
      </>

      }

      {userClientType === "COMPANY"&& 
      <>
      <Link to={"/coupons"}>Coupons</Link>
      {/* <Link to={"/coupons/add"}>Add Coupon</Link> */}
      </>
      }

      {userClientType === "CUSTOMER" && 
      <>
      <Link to={"customer/coupons"}>Coupons</Link>
      <Link to={"customer/coupons/my"}>My Coupons</Link>
      </>
      }
    </div>
  );
}

export default Menu;
