import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import "./AddNewCustomer.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomerModel } from "../../../Models/CustomerModel";
import adminWebApi from "../../../Services/WebApi/AdminWebApi";
import notify, { SccMsg } from "../../../Services/NotificationService";
import { addCustomerAction } from "../../../Redux/CustomerAppState";
import { useForm } from "react-hook-form";


function AddNewCustomer(): JSX.Element {

    const navigate = useNavigate();

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

    const schema = yup.object().shape({
        firstName:
            yup.string().required("First name is required"),
        lastName:
            yup.string().required("Last name is required"),
        email:
            yup.string().required("email is required"),
        password:
            yup.string().min(3, "password length minimum is 3 letters").required("password is required"),
    });

    const postCustomer = async (customer: CustomerModel) => {
        await adminWebApi.addCustomer(customer)
            .then(res => {
                notify.success(SccMsg.CUSTOMER_ADD_SUCCESS);
                store.dispatch(addCustomerAction(res.data));
                navigate('/customers');
            })
            .catch(err => {
                notify.error(err);
            })
    }

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<CustomerModel>({ mode: "all", resolver: yupResolver(schema) });



    return (
        <div className="AddNewCustomer">
			<h2>Add Customer</h2>
            <form onSubmit={handleSubmit(postCustomer)}>
                {(errors.firstName) ? <span>{errors.firstName?.message}</span> : <label htmlFor="firstName">FirstName</label>}
                <input {...register("firstName")} id="firstName" name="firstName" type="text" placeholder="FirstName..." />
                {(errors.lastName) ? <span>{errors.lastName?.message}</span> : <label htmlFor="lastName">LastName</label>}
                <input {...register("lastName")} id="lastName" name="lastName" type="text" placeholder="LastName..." />
                {(errors.email) ? <span>{errors.email?.message}</span> : <label htmlFor="email">Email</label>}
                <input {...register("email")} id="email" name="email" type="email" placeholder="Email..." />
                {(errors.password) ? <span>{errors.password?.message}</span> : <label htmlFor="password">Password</label>}
                <input {...register("password")} id="password" name="password" type="password" placeholder="Password..." />
                <button disabled={!isValid}>Add Customer</button>

            </form>
        </div>
    );
}

export default AddNewCustomer;
