
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../../Models/CouponModel";
import store from "../../../../Redux/Store";
import PurchaseCoupon from "../../../CustomerServiceArea/PurchaseCoupon/PurchaseCoupon";
import "./CouponCard.css";

interface CardProps{
    coupon: CouponModel;
}

function CouponCard(props:CardProps): JSX.Element {

    const navigate = useNavigate();

    const coupon = store.getState().customerReducer.customerCoupons.find((coupon)=>coupon.id === props.coupon.id);

    
    
    const [purchased, setPurchased] = useState(false);

    function buyCoupon(id:number | undefined){
        navigate("/customer/coupons/purchase/" + id);
    }


    return (
        <div className="Card box col">
            <img src={props.coupon.image} alt="coupon"/>
            <p>#{props.coupon.id}</p>
            <p>{props.coupon.title}</p>
            <p>{props.coupon.description}</p>
            <p>{props.coupon.category}</p>
            <p>{props.coupon.price}</p>
            <p>{props.coupon.amount}</p>
            <p>{props.coupon.startDate?.toString()}</p>
            <p>{props.coupon.endDate?.toString()}</p>
    
            {coupon?<button disabled={true} onClick={()=>buyCoupon(props?.coupon?.id)}>Buy Now</button>:
            <button onClick={()=>buyCoupon(props?.coupon?.id)}>Buy Now</button>}
            
        </div>
    );
}

export default CouponCard;
