import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../../../Models/CouponModel";
import "./CouponCompanyCard.css";
import {AiFillDelete} from "react-icons/ai";
import {BsPencilSquare} from "react-icons/bs";

interface CardProps{
    coupon: CouponModel;
}
function CouponCompanyCard(props:CardProps): JSX.Element {
    const navigate = useNavigate();

    function removeCoupon(id:number | undefined){
        navigate("/coupons/remove/"+id)
    }

    function editCoupon(id:number | undefined){
        navigate("/coupons/edit/"+id)
    }
    return (
        <div className="CouponCompanyCard box col">
            <img src={props.coupon.image} alt="coupon"/>
            <p>#{props.coupon.id}</p>
            <p>{props.coupon.title}</p>
            <p>{props.coupon.description}</p>
            <p>{props.coupon.category}</p>
            <p>{props.coupon.price}</p>
            <p>{props.coupon.amount}</p>
            <p>{props.coupon.startDate?.toString()}</p>
            <p>{props.coupon.endDate?.toString()}</p> 
            <div>
            <button  className="button" onClick={()=>removeCoupon(props.coupon.id)}><AiFillDelete color="red" size={20}/></button>
            <button  className="button" onClick={()=>editCoupon(props.coupon.id)}><BsPencilSquare color="blue" size={20}/></button>

            </div>        
            

        </div>
    );
}

export default CouponCompanyCard;
