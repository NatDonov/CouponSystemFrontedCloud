import { Category } from "./CategoryModel";
import { CompanyModel } from "./CompanyModel";


export interface CouponModel{
    id?: number;
    title?: string;
    description?: string;
    category?: string;
    price: number;
    amount?: number;
    startDate?: Date;
    endDate?: Date;
    image?: string; 
    // company?: CompanyModel; 
}