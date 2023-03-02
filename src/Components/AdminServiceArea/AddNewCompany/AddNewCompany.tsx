import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import "./AddNewCompany.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CompanyModel } from "../../../Models/CompanyModel";
import adminWebApi from "../../../Services/WebApi/AdminWebApi";
import notify, { SccMsg } from "../../../Services/NotificationService";
import { addedCompanyAction } from "../../../Redux/CompanyAppState";

function AddNewCompany(): JSX.Element {

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
        name:
            yup.string().required("name is required"),
        email:
            yup.string().required("email is required"),
        password:
            yup.string().min(3, "password length minimum is 3 letters").required("password is required"),
    });

    const postCompany = async(company: CompanyModel) => {
         await adminWebApi.addCompany(company)
            .then(res => {
                notify.success(SccMsg.COMPANY_ADD_SUCCESS);
                store.dispatch(addedCompanyAction(res.data));
                navigate('/companies');
            })
            .catch(err => {
                notify.error(err);
            })
    }

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<CompanyModel>({ mode: "all", resolver: yupResolver(schema) });
    return (
        <div className="AddNewCompany">
            <h2>Add Company</h2>
            <form onSubmit={handleSubmit(postCompany)}>
                {(errors.name) ? <span>{errors.name?.message}</span> : <label htmlFor="name">Name</label>}
                <input {...register("name")} id="name" name="name" type="text" placeholder="Name..." />
                {(errors.email) ? <span>{errors.email?.message}</span> : <label htmlFor="email">Email</label>}
                <input {...register("email")} id="email" name="email" type="email" placeholder="Email..." />
                {(errors.password) ? <span>{errors.password?.message}</span> : <label htmlFor="password">Password</label>}
                <input {...register("password")} id="password" name="password" type="password" placeholder="Password..." />
                <button disabled={!isValid}>Add Company</button>
            </form>
        </div>
    );
}

export default AddNewCompany;
