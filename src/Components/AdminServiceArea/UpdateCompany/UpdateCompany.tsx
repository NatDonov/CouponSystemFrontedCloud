import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyModel } from "../../../Models/CompanyModel";
import store from "../../../Redux/Store";
import "./UpdateCompany.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import adminWebApi from "../../../Services/WebApi/AdminWebApi";
import notify, { SccMsg } from "../../../Services/NotificationService";
import { useForm, useFormState } from "react-hook-form";

function UpdateCompany(): JSX.Element {

    const params = useParams();
    const id = +(params.id || 0)

    const toUpdate = store.getState().companyReducer.companies.filter(company=> company.id === id)[0];
    
    const [obj, setObj] = useState<CompanyModel>(toUpdate);
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

    const putCompany = async (company: CompanyModel) => {
        await adminWebApi.updateCompany(id,company)
            .then(res => {
                notify.success(SccMsg.COMPANY_EDITED_SUCCESS);
                navigate('/companies');
            })
            .catch(err => {
                notify.error(err);
            })
    };

    let defaultValuesObj = { ...obj };

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } }
        = useForm<CompanyModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    const { dirtyFields } = useFormState({control});


    
    return (
        <div className="UpdateCompany">
             <h1>Edit Company</h1>
            <form onSubmit={handleSubmit(putCompany)}>
                <input disabled={true} id="id" name="id" type="number" placeholder="Id..." value={id} />
                {(errors.name) ? <span>{errors.name?.message}</span> : <label htmlFor="name">Name</label>}
                <input {...register("name")} id="name" name="name" type="name" placeholder="Name..." />
                {(errors.email) ? <span>{errors.email?.message}</span> : <label htmlFor="email">Email</label>}
                <input {...register("email")} id="email" name="email" type="text" placeholder="Email..." />
                {(errors.password) ? <span>{errors.password?.message}</span> : <label htmlFor="password">Password</label>}
                <input {...register("password")} id="password" name="password" type="password" placeholder="Password..." />
                <button disabled={!isValid || !isDirty}>Update Company</button>
            </form>
			
        </div>
    );
}

export default UpdateCompany;
