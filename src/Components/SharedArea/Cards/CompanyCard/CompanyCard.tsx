import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../../Models/CompanyModel";
import "./CompanyCard.css";
import {AiFillDelete} from "react-icons/ai";
import {BsPencilSquare} from "react-icons/bs";


interface companyCardProps{
    company:CompanyModel;
}

function CompanyCard(props:companyCardProps): JSX.Element {
    const navigate = useNavigate();

    function removeCompany(id:number | undefined){
        navigate("/companies/remove/"+id)
    }

    function editCompany(id:number | undefined){
        navigate("/companies/edit/"+id)
    }
    return (
        <div className="CompanyCard box col">
            <p>#{props?.company?.id}</p>
            <p>{props?.company?.name}</p>
            <p>{props?.company?.email}</p>
            <div>
            <button className="button" onClick={()=>removeCompany(props.company.id)}><AiFillDelete color="red" size={20}/></button>
            <button className="button" onClick={()=>editCompany(props.company.id)}><BsPencilSquare color="blue" size={20}/></button>

            </div>
            
        </div>
    );
}

export default CompanyCard;
