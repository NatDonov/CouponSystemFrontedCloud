import { AxiosResponse } from "axios";
import { CompanyModel } from "../../Models/CompanyModel";
import { CustomerModel } from "../../Models/CustomerModel";
import tokenAxios from "../AxiosToken";
import global from "../Config";

class AdminWebApi{

    private adminApi= global.urls.admin;


    public addCompany(company:CompanyModel):Promise<AxiosResponse<CompanyModel>>{
        return tokenAxios.post<CompanyModel>(this.adminApi+"/companies", company);
    }

    public deleteCompany(companyId:number):Promise<AxiosResponse<any>>{
        return tokenAxios.delete<any>(this.adminApi+"/companies/"+companyId);

    }

    public updateCompany(companyId:number, company:CompanyModel):Promise<AxiosResponse<CompanyModel>>{
        return tokenAxios.put<CompanyModel>(this.adminApi+"/companies/"+companyId, company);
    }

    public getAllCompanies():Promise<AxiosResponse<CompanyModel[]>>{
        return tokenAxios.get<CompanyModel[]>(this.adminApi+"/companies");
    }

    public getOneCompany(companyId:number):Promise<AxiosResponse<any>>{
        return tokenAxios.get<any>(this.adminApi+"/companies/"+companyId);
    }


    public addCustomer(customer:CustomerModel):Promise<AxiosResponse<CustomerModel>>{
        return tokenAxios.post<CustomerModel>(this.adminApi+"/customers", customer);
    }

    public deleteCustomer(customerId:number):Promise<AxiosResponse<any>>{
        return tokenAxios.delete<any>(this.adminApi+"/customers/"+customerId);
    }

    public updateCustomer(customerId:number, customer:CustomerModel):Promise<AxiosResponse<CustomerModel>>{
        return tokenAxios.put<CustomerModel>(this.adminApi+"/customers/"+customerId, customer);
    }

    public getAllCustomers():Promise<AxiosResponse<CustomerModel[]>>{
        return tokenAxios.get<CustomerModel[]>(this.adminApi+"/customers");
    }

    public getOneCustomer(customerId:number):Promise<AxiosResponse<any>>{
        return tokenAxios.get<any>(this.adminApi+"/customers/"+customerId);
    }













}


const adminWebApi = new AdminWebApi();


export default adminWebApi;