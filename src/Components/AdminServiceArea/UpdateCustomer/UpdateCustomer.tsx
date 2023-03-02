import { useNavigate, useParams } from "react-router-dom";
import { CompanyModel } from "../../../Models/CompanyModel";
import { CustomerModel } from "../../../Models/CustomerModel";
import store from "../../../Redux/Store";
import "./UpdateCustomer.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import notify, { SccMsg } from "../../../Services/NotificationService";
import adminWebApi from "../../../Services/WebApi/AdminWebApi";
import { useForm, useFormState } from "react-hook-form";
import { useEffect, useState } from "react";

function UpdateCustomer(): JSX.Element {

    const params = useParams();
    const id = +(params.id || 0)

    const toUpdate = store.getState().customerReducer.customers.filter(customer=> customer.id === id)[0];
    
    const [obj, setObj] = useState<CustomerModel>(toUpdate);
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
            yup.string().required("email is missing"),
        password:
            yup.string().min(3, "password length minimum is 3 letters").required("password is missing"),
    });


    const putCustomer = async (customer: CustomerModel) => {
        await adminWebApi.updateCustomer(id,customer)
            .then(res => {
                notify.success(SccMsg.CUSTOMER_EDITED_SUCCESS);
                navigate('/customers');
            })
            .catch(err => {
                notify.error(err);
            })
    };

    let defaultValuesObj = { ...obj };

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } }
        = useForm<CustomerModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    const { dirtyFields } = useFormState({control});




    return (
        <div className="UpdateCustomer">
            <h2>Edit Customer</h2>
            <form onSubmit={handleSubmit(putCustomer)}>
            <input disabled={true} id="id" name="id" type="number" placeholder="Id..." value={id} />
                {(errors.firstName) ? <span>{errors.firstName?.message}</span> : <label htmlFor="firstName">FirstName</label>}
                <input {...register("firstName")} id="firstName" name="firstName" type="text" placeholder="FirstName..." />
                {(errors.lastName) ? <span>{errors.lastName?.message}</span> : <label htmlFor="lastName">LastName</label>}
                <input {...register("lastName")} id="lastName" name="lastName" type="text" placeholder="LastName..." />
                {(errors.email) ? <span>{errors.email?.message}</span> : <label htmlFor="email">Email</label>}
                <input {...register("email")} id="email" name="email" type="text" placeholder="Email..." />
                {(errors.password) ? <span>{errors.password?.message}</span> : <label htmlFor="password">Password</label>}
                <input {...register("password")} id="password" name="password" type="password" placeholder="Password..." />
                <button disabled={!isValid}>Edit Customer</button>

            </form>
			
        </div>
    );
}

export default UpdateCustomer;



