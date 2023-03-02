import { CouponModel } from "../../../../Models/CouponModel";
import "./MyCouponCard.css";

interface MyCouponCardProps {
    coupon: CouponModel;	
}

function MyCouponCard(props: MyCouponCardProps): JSX.Element {
    return (
        <div className="MyCouponCard box col">
            <img src={props.coupon.image} alt="coupon"/>
            <p>#{props.coupon.id}</p>
            <p>{props.coupon.title}</p>
            <p>{props.coupon.description}</p>
            <p>{props.coupon.category}</p>
            <p>{props.coupon.price}</p>
            <p>{props.coupon.amount}</p>
            <p>{props.coupon.startDate?.toString()}</p>
            <p>{props.coupon.endDate?.toString()}</p>
			
        </div>
    );
}

export default MyCouponCard;
