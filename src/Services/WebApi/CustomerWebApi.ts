import { AxiosResponse } from "axios";
import { Category } from "../../Models/CategoryModel";
import { CouponModel } from "../../Models/CouponModel";
import { CustomerModel } from "../../Models/CustomerModel";
import tokenAxios from "../AxiosToken";
import global from "../Config";

class CustomerWebApi{
  
    private customerApi=global.urls.customers;
  

    public getCustomerPurchaseCoupons(): Promise<AxiosResponse<CouponModel[]>>{
        return tokenAxios.get<CouponModel[]>(this.customerApi+"/coupons");
    }

    public getAllCoupons():Promise<AxiosResponse<CouponModel[]>>{
        return tokenAxios.get<CouponModel[]>(this.customerApi + "/allcoupons");
    }

    public getCustomerCoupons():Promise<AxiosResponse<CouponModel[]>>{
        return tokenAxios.get<CouponModel[]>(this.customerApi + "/coupons");
    }

    public getCouponsByCategory(category:Category):Promise<AxiosResponse<CouponModel[]>>{
        return tokenAxios.get<CouponModel[]>(this.customerApi+"/coupons/category?category="+category);
    }

    public getCouponsByMaxPrice(maxPrice:number):Promise<AxiosResponse<CouponModel[]>>{
        return tokenAxios.get<CouponModel[]>(this.customerApi+"/coupons/max-price?max-price"+maxPrice);
    }

    public getCustomerDetails():Promise<AxiosResponse<CustomerModel>>{
        return tokenAxios.get<CustomerModel>(this.customerApi+"/details");
    }

    public purchaseCoupon(coupon: CouponModel | undefined):Promise<AxiosResponse<CouponModel>>{
        return tokenAxios.post<CouponModel>(this.customerApi+"/coupons", coupon);
    }

}

const customerWebApi = new CustomerWebApi();


export default customerWebApi;