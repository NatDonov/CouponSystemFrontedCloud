import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Category } from "../../../Models/CategoryModel";
import { CouponModel } from "../../../Models/CouponModel";
import { gotAllCouponsAction, gotCustomerCouponsAction } from "../../../Redux/CustomerAppState";
import store from "../../../Redux/Store";
import notify, { SccMsg } from "../../../Services/NotificationService";
import customerWebApi from "../../../Services/WebApi/CustomerWebApi";

import CouponCard from "../../SharedArea/Cards/CouponCard/CouponCard";
import Confeti from "../../SharedArea/Confeti/Confeti";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";

import "./ShowCoupons.css";

function ShowCoupons(): JSX.Element {

  const [coupons, setCoupons] = useState<CouponModel[]>(store.getState().customerReducer.coupons);

  const navigate = useNavigate();

  const [myCoupons, setMyCoupons] = useState<CouponModel[]>(coupons);
  const [isConfeti, setIsConfeti] = useState<boolean>(store.getState().customerReducer.confetiStyle);


  const [category, setCategory] = useState<string>("ALL");
  const [filter, setFilter] = useState<CouponModel[]>(myCoupons);
  const [price, setPrice] = useState<number>(0);

  const [filterCoupons, setFilterCoupons] = useState<CouponModel[]>(store.getState().customerReducer.customerCoupons);


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

  const handleSelect = (e: any) => {
    let filter = coupons;
    if (e !== "ALL") {
      filter = coupons.filter((c) => {
        return c.category === e.target.value;
      });
    }
    setCategory(e.target.value);
    setFilter(filter);
  }

  const handleInput = (e: any) => {
    setPrice(e.target.value);
  }

  

  



  useEffect(() => {
    store.subscribe(() => { setIsConfeti(store.getState().customerReducer.confetiStyle) });
    customerWebApi.getAllCoupons().then(res => {
      setCoupons(res.data);
      notify.success(SccMsg.GOT_COUPONS_SUCCESS);
      store.dispatch(gotAllCouponsAction(res.data));

    })
      .catch((error) => {
        notify.error(error);

      });

    customerWebApi.getCustomerCoupons().then(res => {
      store.dispatch(gotCustomerCouponsAction(res.data));

    })
      .catch((error) => {
        notify.error(error);

      });

  }, [])

  return (
    <div className="ShowCoupons">
      {isConfeti ? <Confeti /> : <></>}
      <h2>All Coupons</h2>
      <div className="filter">
        <select onChange={handleSelect} placeholder="category" id="category">
          <option value="" disabled={true} style={{ color: "black" }}>Category</option>
          <option value="ALL">ALL</option>
          <option value="FOOD">{Category.FOOD}</option>
          <option value="RESTAURANT">{Category.RESTAURANT}</option>
          <option value="VACATION">{Category.VACATION}</option>
          <option value="TOYS">{Category.TOYS}</option>
          <option value="ELECTRICITY">{Category.ELECTRICITY}</option>
        </select>

        <input onInput={handleInput} value={price} type="number" max={500} className="slider" step={0.1}/> 
      </div>

      <div>
        {
          coupons.length > 0 ?
            (
              <>
                {(category === "ALL" ? coupons : filter).filter((c) => {
                  if (c.price <= price && price > 0 ){
                    return c;
                  }
                  else if (price < 1){
                    return c;
                  }
                }).map(t => <CouponCard key={t.id} coupon={t} />)}

              </>
            ) : (
              <EmptyView msg="No Coupons 4u" />

            )
        }
      </div>

    </div>
  );
}

export default ShowCoupons;
