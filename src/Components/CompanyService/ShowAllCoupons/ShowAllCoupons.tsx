import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Category } from "../../../Models/CategoryModel";
import { ClientType } from "../../../Models/ClientTypeModel";
import { CouponModel } from "../../../Models/CouponModel";
import { gotAllCouponsAction } from "../../../Redux/CompanyAppState";
import store from "../../../Redux/Store";
import notify, { SccMsg } from "../../../Services/NotificationService";
import companyWebApi from "../../../Services/WebApi/CompanyWebApi";
import CouponCompanyCard from "../../SharedArea/Cards/CouponCompanyCard/CouponCompanyCard";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import "./ShowAllCoupons.css";
import {AiFillPlusCircle} from "react-icons/ai";

function ShowAllCoupons(): JSX.Element {

    const navigate = useNavigate();
    const[coupons,setCoupons]=useState<CouponModel[]>(store.getState().companyReducer.coupons);
    
    const [category, setCategory] = useState<string>("ALL");
    const [filter, setFilter] = useState<CouponModel[]>(coupons);
    const [price, setPrice] = useState<number>(0);


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

    useEffect(()=>{
        companyWebApi.getAllCoupons().then((res)=>{
            setCoupons(res.data);
            notify.success(SccMsg.GOT_COUPONS_SUCCESS);
            store.dispatch(gotAllCouponsAction(res.data));         

        }).catch(e=>notify.error(e))
    },[])

    
    return (
        <div className="ShowAllCoupons">
            <h2>All coupons</h2>

            <div className="filter">
                    <select onChange={handleSelect} placeholder="category" id="category">
                        <option value="" disabled={true}  style={{ color: "black" }}>Category</option>
                        <option value="ALL">ALL</option>
                        <option value="FOOD">{Category.FOOD}</option>
                        <option value="RESTAURANT">{Category.RESTAURANT}</option>
                        <option value="VACATION">{Category.VACATION}</option>
                        <option value="TOYS">{Category.TOYS}</option>
                        <option value="ELECTRICITY">{Category.ELECTRICITY}</option>
                    </select>

                    <input onInput={handleInput} value={price} type="number" max={500} className="slider" step={0.1}/> 
            </div>
            <button className="addButton" onClick={() => navigate("add")}><AiFillPlusCircle />Add new Coupon</button>
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
                        }).map(t => <CouponCompanyCard key={t.id} coupon={t} />)}

                    </>
                ):(
                    <EmptyView msg="No Coupons 4u"/>

                )
}
            </div>
           
        </div>
    );
}

export default ShowAllCoupons;
