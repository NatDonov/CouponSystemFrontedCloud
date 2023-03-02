import { AxiosResponse } from "axios";
import { Category } from "../../Models/CategoryModel";
import { CompanyModel } from "../../Models/CompanyModel";
import { CouponModel } from "../../Models/CouponModel";
import tokenAxios from "../AxiosToken";
import global from "../Config";

class CompanyWebApi{

    private companyApi=global.urls.company;

    public addCoupon(coupon:CouponModel):Promise<AxiosResponse<CouponModel>>{
        
        return tokenAxios.post<CouponModel>(this.companyApi+"/coupons", coupon);
    }

    public deleteCoupon(couponId:number):Promise<AxiosResponse<any>>{
        return tokenAxios.delete<any>(this.companyApi+"/coupons/"+couponId);
    }

    public updateCoupon(couponId:number, coupon:CouponModel):Promise<AxiosResponse<CouponModel>>{
        return tokenAxios.put<CouponModel>(this.companyApi+"/coupons/"+couponId, coupon);
    }

    public getAllCoupons():Promise<AxiosResponse<CouponModel[]>>{
        return tokenAxios.get<CouponModel[]>(this.companyApi+"/coupons");
    }

    public getOneCoupon(couponId:number):Promise<AxiosResponse<any>>{
        return tokenAxios.get<any>(this.companyApi+"/"+couponId);
    }

    public getCouponsByCategory(category:Category):Promise<AxiosResponse<CouponModel[]>>{
        return tokenAxios.get<CouponModel[]>(this.companyApi+"/coupons/category?category="+category);
    }

    public getCouponsByMaxPrice(maxPrice:number):Promise<AxiosResponse<CouponModel[]>>{
        return tokenAxios.get<CouponModel[]>(this.companyApi+"/coupons/max-price?max-price"+maxPrice);
    }

    public getCompanyDetails():Promise<AxiosResponse<CompanyModel>>{
        return tokenAxios.get<CompanyModel>(this.companyApi+"/details");
    }

}

const companyWebApi = new CompanyWebApi();


export default companyWebApi;

