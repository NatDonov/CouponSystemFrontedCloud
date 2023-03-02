import { Notyf } from 'notyf';

export enum SccMsg {
    LOGIN_SUCCESS = 'logged in successfully',
    LOGOUT_SUCCESS = 'logged out successfully',
    GOT_COUPONS_SUCCESS = 'coupons fetched successfully',
    COMPANY_ADD_SUCCESS = 'company added successfully',
    COMPANY_DELETE_SUCCESS= 'company deleted successfully',
    COMPANY_EDITED_SUCCESS='company edited successfully',
    CUSTOMER_ADD_SUCCESS = 'customer added successfully',
    CUSTOMER_DELETE_SUCCESS= 'customer deleted successfully',
    CUSTOMER_EDITED_SUCCESS='customer edited successfully',
    COUPON_DELETED_SUCCESS='coupon deleted successfully',
    COUPON_EDITED_SUCCESS='coupon edited successfully',
    COUPON_ADD_SUCCESS = 'coupon added successfully',
    COUPON_PURCHASE_SUCCESS = 'coupon purchased successfully',
}




class Notify {

    private notification = new Notyf({ duration: 4000, position: { x: "left", y: "top" } });

    public success(message: SccMsg) {
        this.notification.success(message);
    }

    public error(err:string ) {
        this.notification.error(this.extractMsg(err));
    }
    private extractMsg(err: any): string {

        if (typeof err === 'string') {
            return err;
        }

        if (typeof err?.response?.data.value === 'string') { 
            return err.response.data.value;
        }

        if (typeof err?.response?.data === 'string') { 
            return err.response.data;
        }

        if (Array.isArray(err?.response?.data)) { 
            return err?.response?.data[0];
        }

        if (typeof err?.message === 'string') {
            return err.message;
        }


        return "Please try again.";


    }


}
const notify = new Notify();
export default notify;