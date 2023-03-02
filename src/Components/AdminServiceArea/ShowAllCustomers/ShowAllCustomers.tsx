import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomerModel } from "../../../Models/CustomerModel";
import { gotCompaniesAction } from "../../../Redux/CompanyAppState";
import { gotCustomersAction } from "../../../Redux/CustomerAppState";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotificationService";
import adminWebApi from "../../../Services/WebApi/AdminWebApi";
import CustomerCard from "../../SharedArea/Cards/CustomerCard/CustomerCard";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import "./ShowAllCustomers.css";
import {AiFillPlusCircle} from "react-icons/ai";

function ShowAllCustomers(): JSX.Element {
    const navigate = useNavigate();
    const[customers,setCustomers]=useState<CustomerModel[]>([]);

    useEffect(() => {
        const token = store.getState().authReducer.loginResponse.token;
        const clientType = store.getState().authReducer.loginResponse.clientType;
    
        if (!token) {
            navigate("/login");

        }
        if(clientType !== "ADMINISTRATOR"){
            navigate("/login");
        }
    }, []);

    useEffect(()=>{
        adminWebApi.getAllCustomers().then((res)=>{
            setCustomers(res.data);
            store.dispatch(gotCustomersAction(res.data));
        }).catch(e=>notify.error(e))
    },[])


    return (
        <div className="ShowAllCustomers">
            <h2>All customers</h2>
            <button className="addButton" onClick={() => navigate("add")}><AiFillPlusCircle /> Add new Customer </button>

            <div>
                {
                    customers.length > 0
                    ? <>{customers.map((customer)=><CustomerCard key={customer.id} customer={customer}/>)}</>
                    : <EmptyView msg="No Customers 4u"/>
                }
            </div>
            
			
        </div>
    );
}

export default ShowAllCustomers;
