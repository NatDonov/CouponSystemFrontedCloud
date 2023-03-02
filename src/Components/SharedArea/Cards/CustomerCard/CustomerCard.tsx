import { useNavigate } from "react-router-dom";
import { CustomerModel } from "../../../../Models/CustomerModel";
import "./CustomerCard.css";
import {AiFillDelete} from "react-icons/ai";
import {BsPencilSquare} from "react-icons/bs";

interface customerCardProps{
    customer:CustomerModel
}

function CustomerCard(props:customerCardProps): JSX.Element {
    const navigate = useNavigate();
    function removeCustomer(id:number | undefined){
        navigate("/customers/remove/"+id)
    }

    function editCustomer(id:number | undefined){
        navigate("/customers/edit/"+id)
    }
    return (
        <div className="CustomerCard box col">
            <p>#{props.customer?.id}</p>
            <p>{props.customer?.firstName}</p>
            <p>{props.customer?.lastName}</p>
            <p>{props.customer?.email}</p>
            <div>
            <button className="button" onClick={()=>removeCustomer(props.customer.id)}><AiFillDelete color="red" size={20}/></button>
            <button className="button" onClick={()=>editCustomer(props.customer.id)}><BsPencilSquare color="blue" size={20}/></button>
            </div>
            
			
        </div>
    );
}

export default CustomerCard;
