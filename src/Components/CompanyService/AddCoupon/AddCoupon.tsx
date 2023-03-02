import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import "./AddCoupon.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CouponModel } from "../../../Models/CouponModel";
import companyWebApi from "../../../Services/WebApi/CompanyWebApi";
import notify, { SccMsg } from "../../../Services/NotificationService";
import { addedCouponAction } from "../../../Redux/CompanyAppState";
import { useForm } from "react-hook-form";
import { Category } from "../../../Models/CategoryModel";
import {BsImage} from "react-icons/bs";

function AddCoupon(): JSX.Element {
    const navigate = useNavigate();
    

    useEffect(() => {
        const token = store.getState().authReducer.loginResponse.token;
        const clientType = store.getState().authReducer.loginResponse.clientType;
    
        if (!token) {
            navigate("/login");

        }
        if(clientType !== "COMPANY"){
            navigate("/login");
        }
    }, []);

    const schema = yup.object().shape({
        category:
            yup.string()
                .required("Category is required"),
        title:
            yup.string()
                .required("title is required"),
        description:
            yup.string()
                .required("description is required"),
        startDate: yup
            .date()
            .min(new Date(Date.now()-86400_000), "start date can't be before today")
            .default(new Date())
            .typeError("You must specify a Start Date")
            .required("Start Date is required")
            .nullable(),
        endDate: yup
            .date()
            .min(yup.ref("startDate"), "end date can't be before start date")
            .default(new Date())
            .typeError("You must specify a End Date")
            .required("End Date is required")
            .nullable(),
        amount:
            yup.number()
                .min(1, ("can't be zero or negative"))
                .required("Number is required"),
        price:
            yup.number()
                .min(1, "can't be zero or negative")
                .required("Price is required"),
        image:

        yup.string().default("https://picsum.photos/200/100"),

    });
   
    const postCoupon = async(coupon:CouponModel)=>{       
        await companyWebApi.addCoupon(coupon)
        .then(res=> {
            notify.success(SccMsg.COUPON_ADD_SUCCESS);
            store.dispatch(addedCouponAction(res.data));      
            navigate('/coupons');
        })
        .catch(err => {
            notify.error(err);
        })
    }

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<CouponModel>({ mode: "all", resolver: yupResolver(schema) });


    return (
        <div className="AddCoupon">
			<h2>Add Coupon</h2>
            <form onSubmit={handleSubmit(postCoupon)}>
                {(errors.title) ? <span>{errors.title?.message}</span> : <label htmlFor="title">Title</label>}
                <input {...register("title")} id="title" name="title" type="text" placeholder="Title..." />
                {(errors.description) ? <span>{errors.description?.message}</span> : <label htmlFor="description">Description</label>}
                <input {...register("description")} id="description" name="description" type="text" placeholder="Description..." />
                {(errors.amount) ? <span>{errors.amount?.message}</span> : <label htmlFor="amount">Amount</label>}
                <input {...register("amount")} id="amount" name="amount" type="number" placeholder="Amount..." />
                {(errors.price) ? <span>{errors.price?.message}</span> : <label htmlFor="price">Price</label>}
                <input {...register("price")} id="price" name="price" type="number" placeholder="Price..." />
                {(errors.startDate) ? <span>{errors.startDate?.message}</span> : <label htmlFor="startDate">StartDate</label>}
                <input {...register("startDate")} id="startDate" name="startDate" type="date" placeholder="StartDate..." />
                {(errors.endDate) ? <span>{errors.endDate?.message}</span> : <label htmlFor="endDate">EndDate</label>}
                <input {...register("endDate")} id="endDate" name="endDate" type="date" placeholder="EndDate..." />
                
                <select {...register("category")}>
                    <option value="" disabled={true} selected style={{ color: "black" }}>Category</option>
                    <option value="FOOD">{Category.FOOD}</option>
                    <option value="RESTAURANT">{Category.RESTAURANT}</option>
                    <option value="VACATION">{Category.VACATION}</option>
                    <option value="TOYS">{Category.TOYS}</option>
                    <option value="ELECTRICITY">{Category.ELECTRICITY}</option>
                </select>

                {/* {(errors.image) ? <span>{errors.image?.message}</span> : <label htmlFor="image">Image</label>}
                <input {...register("image")} id="image" name="image" type="image" placeholder="Image..." /> */}

                <label htmlFor="imageUrl" className="icon"><BsImage /></label>
                <input {...register("image")} value="https://picsum.photos/200/100" type="text" placeholder="Please enter image url" name="image" />
                <span>{errors.image?.message}</span>
               
                <button disabled={!isValid}>Add Coupon</button>

            </form>
        </div>
    );
}

export default AddCoupon;
